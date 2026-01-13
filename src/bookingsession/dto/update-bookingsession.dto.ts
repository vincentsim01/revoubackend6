import { IsBoolean, IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber, MinLength, Matches } from 'class-validator';

export class UpdateBookingSessionDto {
@IsOptional()
@IsString()
bookingDate?: string;



@IsOptional()
@IsNumber()
userId?: number;


@IsOptional()
@IsNumber()
packageId?: number;


@IsOptional()
@IsNumber()
transactionitemId?: number;

@IsOptional()
@IsNumber()
transactionId?: number;




}