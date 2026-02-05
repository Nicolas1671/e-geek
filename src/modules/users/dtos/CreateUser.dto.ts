import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 80, {
    message: 'La cadena debe tener entre 3 y 80 caracteres',
  })
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'John Doe',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 80, {
    message: 'La cadena debe tener entre 3 y 80 caracteres',
  })
  @ApiProperty({
    description: 'Dirección del usuario',
    example: '123 Main St, City, Country',
  })
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: '+1234567890',
  })
  phone: string;

  @Length(8, 15, {
    message: 'La cadena debe tener entre 8 y 15 caracteres',
  })
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe contener al menos una minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*)',
  })
  password!: string;
}
