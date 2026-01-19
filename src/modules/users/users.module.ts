import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [
    { provide: UsersService, useClass: UsersService },
    //Aca podria usar useValue o useFactory y pasarle un objeto o una funcion
    //que retorne una instancia de UsersService. Tambien podria usar un provide del tipo clave
    //como 'ACCES TOKEN' y un useValue asociado. Luego usar @Inject en el constructor de la clase.
    UsersRepository,
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
