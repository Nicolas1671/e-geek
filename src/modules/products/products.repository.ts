import { Injectable } from '@nestjs/common';
import { Products } from 'src/entities/products.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductsRepository {
  constructor(private dataSource: DataSource) {}
  /*   private products = [

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
  ];*/

  async getProducts() {
    return this.dataSource.getRepository(Products).find({
      relations: ['files'],
    });
  }

  async createProduct(product: Omit<Products, 'id'>): Promise<Products> {
    return this.dataSource.getRepository(Products).save(product);
  }

  async getProductById(id: number): Promise<Products | null> {
    return this.dataSource.getRepository(Products).findOne({
      where: { id },
      relations: ['files'],
    });
  }
}
