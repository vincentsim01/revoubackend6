import { IsBoolean, IsString, IsEmail, IsNotEmpty, IsInt, IsOptional, IsNumber, MinLength, Matches, IsDateString, Min } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateTransactionItemDto {


@ IsInt()
transactionId: number;

@ IsInt()
productId: number;

@IsNumber()
@Min(1)
quantity: number;

@IsNumber()
price: number;  

}
