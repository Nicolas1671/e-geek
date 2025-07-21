import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Post()
  createProduct() {
    return this.productsService.createProduct();
  }

  @Put(':id')
  updateProduct() {
    return this.productsService.updateProduct();
  }

  @Delete(':id')
  deleteProduct() {
    return this.productsService.deleteProduct();
  }

  @Get(':id')
  getProductById() {
    return this.productsService.getProductById();
  }
}
