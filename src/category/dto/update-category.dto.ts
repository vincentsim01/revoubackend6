import { IsBoolean, IsString, IsOptional, IsEmail, IsNotEmpty, IsNumber, MinLength, Matches } from 'class-validator';

export class UpdateCategoryDto {
@IsOptional()
@IsString()
name: string;

@IsOptional()
@IsString()
description: string;


@IsOptional()
@IsNumber()
productId: number;

@IsOptional()
@IsString()
image: string;



}