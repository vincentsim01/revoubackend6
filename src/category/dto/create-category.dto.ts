import { IsBoolean, IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber, MinLength, Matches } from 'class-validator';

export class CreateCategoryDto {
@IsString()
name: string;


@IsString()
description: string;



@IsNumber()
productId: number;


@IsString()
image: string;



}