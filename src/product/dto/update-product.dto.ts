import { IsBoolean, IsString, IsOptional, IsEmail, IsNotEmpty, IsNumber, MinLength, Matches } from 'class-validator';

export class UpdateProductDto {
@IsOptional()
@IsEmail()
title?: string;


@IsOptional()
@IsString()
price?: string;


@IsOptional()
@IsString()
@IsNotEmpty()
description?: string;


@IsOptional()
@IsString()
image?: string;


@IsNumber()
@IsOptional()
stock?  : number;
}
