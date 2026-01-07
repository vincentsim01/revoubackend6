import { IsInt, IsPositive, IsArray } from 'class-validator';

export class CreateTransactionItemDto {


  @IsInt()
  @IsPositive()
  userId: number;

    @IsInt()
  @IsPositive()
  total: number;

    // @IsArray()
    // items: any[];
}