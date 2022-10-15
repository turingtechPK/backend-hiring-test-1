import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('tiny'));

  // Setting up swagger api.
  const config = new DocumentBuilder()
    .setTitle('Turing Test')
    .setDescription('Call forwarding and voicemails.')
    .setVersion('1.0')
    .addTag('turing-test')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
