import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  getOrders(): string[] {
    return ['Order1', 'Order2', 'Order3'];
  }
}
