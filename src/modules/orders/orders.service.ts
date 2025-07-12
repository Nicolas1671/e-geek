import { Injectable } from '@nestjs/common';
import { OrdersRespository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRespository) {}

  getOrders() {
    return this.ordersRepository.getOrders();
  }
}
