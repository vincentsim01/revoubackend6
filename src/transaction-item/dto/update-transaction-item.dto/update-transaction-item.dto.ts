import { IsBoolean, IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber, MinLength, Matches, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';


export class UpdateTransactionItemDto {

@IsOptional()
@IsNumber()
transactionId: number;

@IsOptional()
@IsNumber()
productId: number;

@IsOptional()
quantity: number;

@IsOptional()
@IsNumber()
price: number;  

}
