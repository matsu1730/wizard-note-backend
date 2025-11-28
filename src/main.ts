import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const logger: Logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Server running on port ${process.env.PORT??3000} 🚀`);
}
bootstrap();
