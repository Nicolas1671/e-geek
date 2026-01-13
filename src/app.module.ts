import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { DateAdderInterceptor } from './interceptors/date-adder.interceptor';
//import { APP_INTERCEPTOR } from '@nestjs/core';
//import { AuthGuard } from './guards/auth.guard';
//import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env.development',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'postgres',
        database: ConfigService.get<string>('DB_NAME'),
        host: ConfigService.get<string>('DB_HOST'),
        port: ConfigService.get<number>('DB_PORT'),
        username: ConfigService.get<string>('DB_USER'),
        password: ConfigService.get<string>('DB_PASSWORD'),
        synchronize: true,
        logging: true,
      }),
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [
    //{
    //  provide: APP_GUARD,
    //  useClass: AuthGuard,
    //},
    //{
    //  provide: APP_INTERCEPTOR,
    //  useClass: DateAdderInterceptor,
    //},
  ],
})
export class AppModule {}
