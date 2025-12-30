import { IsBoolean, IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber, MinLength, Matches, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';


export class CreatePaymentDto {


@IsNumber()
@IsNotEmpty()
transactionId: string;


@IsString()
provider: string;



@IsString()
status: 'APPROVED' | 'PENDING' | 'REJECTED';


  @Type(() => Number)
  amount: number;

  

@IsOptional()
@IsDateString()
paidAt?: Date;

}
