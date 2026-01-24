import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
//import { DateAdderInterceptor } from './interceptors/date-adder.interceptor';
//import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalGuards(new AuthGuard());
  //app.useGlobalInterceptors(new DateAdderInterceptor());
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
