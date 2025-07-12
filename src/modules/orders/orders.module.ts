import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRespository } from './orders.repository';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRespository],
})
export class OrdersModule {}
