import { IsBoolean, IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber, MinLength, Matches } from 'class-validator';

export class CreateBookingSessionDto {

@IsString()
bookingDate: string;

@IsString()
status: string;


@IsString()
notes: string;


@IsNumber()
userId: number;



// @IsNumber()
// packageId: number;



// @IsNumber()
// transactionitemId: number;


// @IsNumber()
// transactionId: number;




}