import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"

export class ProductCharacteristicDto{
    @IsString()
    name:string

    @IsNumber()
    value:string
}

export class CreateProductDto{
    @IsString()
    image:string;

    @IsString()
    title:string;

    @IsNumber()
    price:number;

    @IsNumber()
    @IsOptional()
    oldPrice?:number;

    @IsNumber()
    credit:number;

    @IsString()
    description:string;

    @IsString()
    advantages:string;

    @IsString()
    name1:string;

    @IsString()
    disadvantages:string;

    @IsArray()
    @IsString({each:true})
    categories:Array<string>

    @IsArray()
    @IsString({each:true})
    tags:Array<string>;

    @IsArray()
    @ValidateNested()
    @Type(()=>ProductCharacteristicDto)
    characteristics:Array<ProductCharacteristicDto>
}