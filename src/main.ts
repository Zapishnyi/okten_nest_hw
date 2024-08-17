import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './modules/app.module';

async function bootstrap() {
  // main application declaration
  const app = await NestFactory.create(AppModule);

  // configuration of Swagger document
  const config = new DocumentBuilder()
    .setTitle('OKTEN Nest Home Work API')
    .setDescription('API description')
    .setVersion('1.0')
    // .addTag('cats')
    // Usage Context: Used within the configuration of the Swagger module, usually in your main application file
    // or where you set up Swagger for the entire API.
    //   Purpose: This method is used to define a tag in the overall Swagger documentation configuration.
    //   It doesn't directly associate specific controllers or routes with the tag; instead, it just creates the ' +
    // 'tag for organizational purposes.
    .addBearerAuth({
      /* Authentication */
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'headers',
    })
    .build();

  // Creation of Swagger document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelExpandDepth: 1,
      persistAuthorization: true,
    },
  });

  // Pipes
  app.useGlobalPipes(
    // Validation
    new ValidationPipe({
      // if DTO without decorators whole DTO won't be allowed
      whitelist: true,
      // In DTO only properties with decorators are allowed
      forbidNonWhitelisted: true,
      //   Allow transformation of Validated DTO properties (class transform used!!!!)
      transform: true,
    }),
  );
  const port = 3000;
  const host = 'localhost';

  // Start-up of server
  await app.listen(port, () => {
    // Logger - Nest log instead of console.log
    Logger.log(`Server started on: http://${host}:${port}`);
    Logger.log(`Swagger is available on: http://${host}:${port}/api-docs`);
  });
}

void bootstrap();
