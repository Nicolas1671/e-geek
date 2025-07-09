import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  getProducts(): string[] {
    return ['Product1', 'Product2', 'Product3'];
  }
}
