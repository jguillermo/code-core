import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza un error si hay propiedades desconocidas
      transform: true, // Transforma los datos a instancias del DTO
    }),
  );
  await app.listen(3000);
}

bootstrap();
