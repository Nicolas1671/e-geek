import { IsNotEmpty, IsUUID } from 'class-validator';
import { ProductsDto } from 'src/modules/products/dtos/Products.dto';

export class CreateOrderDto {
  id: string;
  status: string;
  date: Date;
  @IsNotEmpty()
  @IsUUID()
  userId: string;
  products: ProductsDto[];
}
