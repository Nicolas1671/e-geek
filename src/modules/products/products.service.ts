import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  getProducts() {
    return this.productsRepository.getProducts();
  }
  getProductById() {
    throw new Error('Method not implemented.');
  }
  deleteProduct() {
    throw new Error('Method not implemented.');
  }
  updateProduct() {
    throw new Error('Method not implemented.');
  }
  createProduct() {
    throw new Error('Method not implemented.');
  }
}
