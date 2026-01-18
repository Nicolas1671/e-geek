import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
//import { DateAdderInterceptor } from './interceptors/date-adder.interceptor';
//import { APP_INTERCEPTOR } from '@nestjs/core';
//import { AuthGuard } from './guards/auth.guard';
//import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const typeOrmConfig = (await configService.get('typeorm')) as object;
        return typeOrmConfig;
      },
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
