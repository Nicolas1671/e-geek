import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity('credentials', { schema: 'public' })
export class Credentials {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'password' })
  password: string;

  @OneToOne(() => Users, (users) => users.credential)
  users: Users;
}
