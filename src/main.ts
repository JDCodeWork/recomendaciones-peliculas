import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Recomendador de películas')
    .setDescription('Sistema de recomendación de películas')
    .setVersion('1.0')
    .addTag(
      'Recomendación',
      'Endpoint para obtener la recomendación de una película de acuerdo a los gustos del usuario',
    )
    .addTag(
      'Semilla',
      'Endpoint para llenar la base de datos con películas y usuarios ',
    )
    .addTag('Usuarios', 'Crud básico para la entidad Usuario')
    .addTag('Películas', 'Crud básico para la entidad Película')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
