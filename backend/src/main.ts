import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import { PrismaService } from './prisma.service';
import {UserService} from "./auth/UserService";

const pgSession = require('connect-pg-simple')(session);

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    const config = new DocumentBuilder()
        .setTitle('Food Delivery API')
        .setDescription('API for managing a food delivery service')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.use(
        session({
            store: new pgSession({
                conObject: { connectionString: process.env.DATABASE_URL },
                createTableIfMissing: true, // This will create the table if it doesn't exist
            }),
            secret: 'your_secret_key', // replace with your secret
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 3600000, // 1 hour
            },
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    const userService = app.get(UserService);
    app.use(async (req, res, next) => {
        if (!req.session.userId) {
            // Create an anonymous user and save to session
            const user = await userService.createAnonymousUser();
            req.session.userId = user.id;
            next();
        } else {
            next();
        }
    });

    app.enableCors({
        origin: [
            'http://localhost:5173',
            'http://localhost:3000',
            '109.68.213.18:80',
            '109.68.213.18:3000'
        ],
        credentials: true,
    });

    await app.listen(3000);
}

bootstrap();
