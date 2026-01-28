import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Products } from './products.entity';
@Entity({ name: 'files' })
export class Files {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mimetype: string;

  @Column({ type: 'bytea' })
  data: Buffer;

  @ManyToOne(() => Products, (product) => product.files)
  @JoinColumn({ name: 'productId' })
  product: Products;
}
