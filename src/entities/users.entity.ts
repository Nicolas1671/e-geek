import {
  Column,
  Entity,
  /*Index*/
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Favoritos } from './favoritos.entity';
import { Orders } from './orders.entity';
import { Credentials } from './credentials.entity';
import { v4 as uuid } from 'uuid';
//@Index('UQ_97672ac88f789774dd47f7c8be3', ['email'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string = uuid();
  //No lo cambie por que tenia que modificar el tipo de dato en postgresql.
  /* @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;
 */
  @Column('character varying', { name: 'name' })
  name: string;

  @Column('character varying', { name: 'email', unique: true })
  email: string;

  @Column('character varying', { name: 'address' })
  address: string;

  @Column('character varying', { name: 'phone' })
  phone: string;

  @Column('enum', {
    name: 'role',
    enum: ['admin', 'user'],
    default: 'user',
  })
  role: 'admin' | 'user';

  @OneToMany(() => Favoritos, (favoritos) => favoritos.user)
  favoritos: Favoritos[];

  @OneToMany(() => Orders, (orders) => orders.user)
  orders: Orders[];

  @OneToOne(() => Credentials, (credentials) => credentials.users)
  @JoinColumn([{ name: 'credentialId', referencedColumnName: 'id' }])
  credential: Credentials;
}
