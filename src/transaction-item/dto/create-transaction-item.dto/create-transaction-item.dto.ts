import { IsBoolean, IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber, MinLength, Matches, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateTransactionItemDto {


@IsNumber()
transactionId: number;

@IsNumber()
productId: number;

@IsNumber()
quantity: number;

@IsNumber()
price: number;  

}
