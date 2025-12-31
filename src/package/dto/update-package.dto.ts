import { IsBoolean, IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber, MinLength, Matches } from 'class-validator';

export class UpdatePackageDto {
@IsOptional()
@IsString()
name: string;

@IsOptional()
@IsString()
description: string;

@IsOptional()
@IsNumber()
price: number;

@IsOptional()
@IsNumber()
durationMin: number;

}