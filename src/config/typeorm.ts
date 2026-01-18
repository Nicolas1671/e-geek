import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
/* import { Categories } from 'src/entities/categories.entity';
import { Credentials } from 'src/entities/credentials.entity';
import { Favoritos } from 'src/entities/favoritos.entity';
import { Orders } from 'src/entities/orders.entity';
import { Products } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entity';
 */
dotenvConfig({ path: './.env.development' });

const config = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  //entities: [Users, Categories, Products, Orders, Favoritos, Credentials],
  autoLoadEntities: true,
  synchronize: false,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export const typeOrmConfig = registerAs('typeorm', () => config);

export default new DataSource(config as DataSourceOptions);
