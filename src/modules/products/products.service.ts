import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from 'src/entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  getProducts() {
    return this.productsRepository.getProducts();
  }
  getProductById(id: number) {
    return this.productsRepository.getProductById(id);
  }
  deleteProduct() {
    throw new Error('Method not implemented.');
  }
  updateProduct() {
    throw new Error('Method not implemented.');
  }
  createProduct(product: Omit<Products, 'id'>) {
    return this.productsRepository.createProduct(product);
  }
}
