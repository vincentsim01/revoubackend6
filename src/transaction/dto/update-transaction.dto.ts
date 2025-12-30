import { IsInt, IsPositive, IsOptional, IsArray } from 'class-validator';

export class UpdateTransactionItemDto {

      @IsOptional()
  @IsInt()
  userId: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  total: number;

  @IsArray()
  @IsOptional()
  items: any[];
}