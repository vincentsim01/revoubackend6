import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsBoolean, IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber, MinLength, Matches, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePaymentDto {
    
    @IsOptional()
    @IsString()
    provider?: string;
    
    @IsOptional()
    @IsString()
    status?: string;
    
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    amount?: number;  
    
    @IsOptional()
    @IsDateString()
    paidAt?: string;
}
