import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { CookieSession } from 'cookie-session';
import { setupApp } from './setup-app';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
