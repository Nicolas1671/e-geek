import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Files } from 'src/entities/files.entity';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files)
    private readonly filesRepository: Repository<Files>,
  ) {}

  async saveFile({
    name,
    mimetype,
    data,
    product,
  }: {
    name: string;
    mimetype: string;
    data: Buffer;
    product: Products;
  }): Promise<Files> {
    const file = new Files();
    file.name = name;
    file.mimetype = mimetype;
    file.data = data;
    file.product = product;
    return this.filesRepository.save(file);
  }
}
