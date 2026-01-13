import { IsBoolean, IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber, MinLength, Matches } from 'class-validator';

export class CreateBookingSessionDto {

@IsNotEmpty()
@IsString()
bookingDate: string;




@IsNotEmpty()
@IsNumber()
userId: number;



@IsNotEmpty()
@IsNumber()
packageId: number;


@IsNotEmpty()
@IsNumber()
transactionitemId: number;

@IsNotEmpty()
@IsNumber()
transactionId: number;




}