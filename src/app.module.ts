import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
//import { DateAdderInterceptor } from './interceptors/date-adder.interceptor';
//import { APP_INTERCEPTOR } from '@nestjs/core';
//import { AuthGuard } from './guards/auth.guard';
//import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UsersModule, ProductsModule, OrdersModule],
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
