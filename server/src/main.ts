import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get('ConfigService').get('PORT') || 3123;
  await app.listen(port);
}
bootstrap();
