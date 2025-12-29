import { IsInt, IsPositive } from 'class-validator';

export class CreateTransactionItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}