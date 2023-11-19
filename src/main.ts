import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { join } from 'path';
import helmet from 'helmet';
import { SharedModule } from '@shared/shared.module';
import { ConfigService } from '@shared/services/config/config.service';
import { setupSwagger } from '@src/swagger';
import { AppModule } from '@src/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Helmet helps you secure your Express apps by setting various HTTP headers.
  // app.use(helmet()); 
  app.enableCors({
    allowedHeaders: '*',
    origin:'*',
    credentials: true,
  });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const reflector = app.get(Reflector);

 

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalPipes(new ValidationPipe({ transform: true , whitelist:true, forbidNonWhitelisted:true  }));

  const configService = app.select(SharedModule).get(ConfigService);
  setupSwagger(app);
  const port = configService.getNumber('PORT');
  await app.listen(port);
  console.info(`server running on port ${port}`);
}
bootstrap();

