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
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 80, {
    message: 'La cadena debe tener entre 3 y 80 caracteres',
  })
  address: string;

  @IsNotEmpty()
  @IsNumber()
  phone: string;

  @Length(8, 15, {
    message: 'La cadena debe tener entre 8 y 15 caracteres',
  })
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe contener al menos una minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*)',
  })
  password: string;
}
