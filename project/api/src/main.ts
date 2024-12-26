import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza un error si hay propiedades desconocidas
      transform: true, // Transforma los datos a instancias del DTO
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('App')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('app')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  await app.listen(3000);
}

bootstrap();
