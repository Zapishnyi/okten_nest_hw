import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('OKTEN Nest Home Work API')
    .setDescription('API description')
    .setVersion('1.0')
    // .addTag('cats')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'headers',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelExpandDepth: 1,
      persistAuthorization: true,
    },
  });

  const port = 3000;
  const host = 'localhost';
  await app.listen(port, () => {
    Logger.log(`Server started on: http://${host}:${port}`);
    Logger.log(`Swagger is available on: http://${host}:${port}/api-docs`);
  });
}
void bootstrap();
