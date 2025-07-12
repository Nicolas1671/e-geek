import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersRespository {
  private orders = [];

  // eslint-disable-next-line @typescript-eslint/require-await
  async getOrders() {
    return this.orders;
  }
}
