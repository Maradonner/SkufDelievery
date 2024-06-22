import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as session from 'express-session';
import passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Food Delivery API')
      .setDescription('API for managing a food delivery service')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(
      session({
        secret: 'your-secret-key', // replace with a strong secret key
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // set to true if using https
      }),
  );

  app.enableCors({
    origin: [
      'http://localhost:5173',
        'http://localhost:3000',
        'https://accounts.google.com',
      'https://maradonner.github.io/SkufDelievery/',  // Production URL
      'http://109.68.213.18',
      '109.68.213.18:80',
      '109.68.213.18:3000'
    ],
      credentials: true,
  });

  await app.listen(3000);

}
bootstrap();
