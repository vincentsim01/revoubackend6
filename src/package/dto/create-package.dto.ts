import { IsBoolean, IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber, MinLength, Matches } from 'class-validator';

export class CreatePackageDto {
@IsString()
name: string;

@IsString()
description: string;


@IsNumber()
price: number;


@IsNumber()
durationMin: number;

}