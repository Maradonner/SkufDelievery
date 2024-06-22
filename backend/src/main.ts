import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Food Delivery API')
      .setDescription('API for managing a food delivery service')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://maradonner.github.io/SkufDelievery/',  // Production URL
      'http://109.68.213.18',
      '109.68.213.18:80',
      '109.68.213.18:3000'
    ],
  });

  await app.listen(3000);

}
bootstrap();
