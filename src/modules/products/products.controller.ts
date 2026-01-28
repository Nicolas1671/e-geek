import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../files/files.service';
import { Files } from 'src/entities/files.entity';
import { Products } from 'src/entities/products.entity';
//import { Express } from 'express';
//import { Multer } from 'multer';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private filesService: FilesService,
  ) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Post()
  createProduct(@Body() product: Omit<Products, 'id'>) {
    return this.productsService.createProduct(product);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProductImage(
    @Body('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Files> {
    if (!file) {
      throw new BadRequestException('No se ha enviado ningún archivo');
    }
    const product = await this.productsService.getProductById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    return this.filesService.saveFile({
      name: file.originalname,
      mimetype: file.mimetype,
      data: file.buffer,
      product: product,
    });
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
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductById(id);
  }
}
