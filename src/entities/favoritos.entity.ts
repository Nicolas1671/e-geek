import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from './products.entity';
import { Users } from './users.entity';

@Entity('favoritos', { schema: 'public' })
export class Favoritos {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => Products, (products) => products.favoritos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
  product: Products;

  @ManyToOne(() => Users, (users) => users.favoritos, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: Users;
}
