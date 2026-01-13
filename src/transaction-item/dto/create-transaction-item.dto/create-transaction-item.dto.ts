import {
  IsInt,
  IsPositive,
  IsNotEmpty,
  IsNumber,
  IsDecimal,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionItemDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  transactionId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsDecimal({ force_decimal: true })
  @IsNotEmpty()
  price: number;
}
