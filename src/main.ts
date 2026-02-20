import * as crypto from 'crypto';

if (typeof global.crypto === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  (global as any).crypto = crypto;
}
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import { config as auth0Config } from './config/auth0';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import { DateAdderInterceptor } from './interceptors/date-adder.interceptor';
//import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalGuards(new AuthGuard());
  //app.useGlobalInterceptors(new DateAdderInterceptor());
  app.use(auth(auth0Config));
  const config = new DocumentBuilder()
    .setTitle('E-Geek API')
    .setDescription('Documentación de la API de E-Geek')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => {
          return {
            field: error.property,
            message: error.constraints,
          };
        });
        return new BadRequestException({
          alert: 'Se detectaron errores',
          errors: messages,
        });
      },
    }),
  );
  app.use(loggerMiddleware);
  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
