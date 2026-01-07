import { IsBoolean, IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber, MinLength, Matches, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';


export class CreatePaymentDto {


@IsNumber()
transactionId: number;

@IsString()
provider: string;

@IsString()
status: string;

@IsNumber()
@Type(() => Number)
amount: number;  

@IsOptional()
@IsDateString()
paidAt?: string;

}
