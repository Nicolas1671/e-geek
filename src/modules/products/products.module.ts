import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Files } from 'src/entities/files.entity';
import { FilesService } from '../files/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Files])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, FilesService],
})
export class ProductsModule {}
