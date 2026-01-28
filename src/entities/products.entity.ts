import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Favoritos } from './favoritos.entity';
import { Orders } from './orders.entity';
import { Categories } from './categories.entity';
import { Files } from './files.entity';

@Entity('products', { schema: 'public' })
export class Products {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('character varying', { name: 'description' })
  description: string;

  @Column('integer', { name: 'price' })
  price: number;

  @Column('integer', { name: 'stock' })
  stock: number;

  @Column('character varying', { name: 'image' })
  image: string;

  @OneToMany(() => Favoritos, (favoritos) => favoritos.product)
  favoritos: Favoritos[];

  @ManyToMany(() => Orders, (orders) => orders.products)
  orders: Orders[];

  @ManyToOne(() => Categories, (categories) => categories.products)
  @JoinColumn([{ name: 'categoryId', referencedColumnName: 'id' }])
  category: Categories;

  @OneToMany(() => Files, (files) => files.product)
  files: Files[];
}
