import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Products } from './products.entity';

@Entity('orders', { schema: 'public' })
export class Orders {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'status' })
  status: string;

  @Column('timestamp without time zone', { name: 'date' })
  date: Date;

  @ManyToOne(() => Users, (users) => users.orders)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: Users;

  @ManyToMany(() => Products, (products) => products.orders)
  @JoinTable({
    name: 'orders_products_products',
    joinColumns: [{ name: 'ordersId', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'productsId', referencedColumnName: 'id' }],
    schema: 'public',
  })
  products: Products[];
}
