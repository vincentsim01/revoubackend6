import { IsBoolean, IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber, MinLength, Matches, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';


export class UpdateTransactionItemDto {



@IsOptional()
@IsNumber()
quantity?: number;

@IsOptional()
@IsNumber()
@Type(() => Number)
price?: number;  

}
