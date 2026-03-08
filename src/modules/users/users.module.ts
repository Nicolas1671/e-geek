import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoggerMiddleware } from '../../middlewares/logger.middleware';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../entities/users.entity';
import { CloudinaryConfig } from '../../config/cloudinary';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { requiresAuth } from 'express-openid-connect';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [
    { provide: UsersService, useClass: UsersService },
    //Aca podria usar useValue o useFactory y pasarle un objeto o una funcion
    //que retorne una instancia de UsersService. Tambien podria usar un provide del tipo clave
    //como 'ACCES TOKEN' y un useValue asociado. Luego usar @Inject en el constructor de la clase.
    UsersRepository,
    CloudinaryConfig,
    CloudinaryService,
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
    consumer.apply(requiresAuth()).forRoutes('users/auth0/protected');
  }
}
