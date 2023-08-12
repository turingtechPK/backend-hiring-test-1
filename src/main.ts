import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/main/app.module';
import { AppService } from '@modules/main/app.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
  AppService.startup();
}
bootstrap();
