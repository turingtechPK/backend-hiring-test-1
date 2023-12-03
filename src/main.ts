import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.use(json({ limit: '5mb' }));

  // Swagger Configuration
  const swagger_config = new DocumentBuilder()
    .setTitle('Twilio - Call Forwarding API Documentation')
    .setDescription('This is a test project for Turing Technologies. The purpose of the project is to implement call forwarding using Twilio Api')
    .setVersion('1.0')
    .addTag('calls')
    .build();

  const document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT || 3001);
}
bootstrap();
