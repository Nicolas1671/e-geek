import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepository {
  private products = [
    {
      name: 'Product1',
      price: 100,
      description: 'Description of Product1',
    },
    {
      name: 'Product2',
      price: 200,
      description: 'Description of Product2',
    },
    {
      name: 'Product3',
      price: 300,
      description: 'Description of Product3',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/require-await
  async getProducts() {
    return this.products;
  }
}
