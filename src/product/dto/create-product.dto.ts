import { IsBoolean, IsString, IsOptional, IsEmail, IsNotEmpty, IsNumber, MinLength, Matches } from 'class-validator';

export class CreateProductDto {
@IsString()
@IsNotEmpty()
title: string;


@IsNumber()
@IsNotEmpty()
price: number;

@IsString()
description?: string;



@IsString()
@IsNotEmpty()
image: string;

@IsNumber()
@IsNotEmpty()
stock: number;
}