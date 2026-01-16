import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => String(value))
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
