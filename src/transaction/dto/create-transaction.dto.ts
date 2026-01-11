import { IsInt, IsPositive, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Type(() => Number)
  total: number;
}