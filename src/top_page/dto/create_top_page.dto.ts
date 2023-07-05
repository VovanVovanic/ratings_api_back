import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { TopLevelCategory } from "../top_page.model/top_page.model";
import { Type } from "class-transformer";

export class HhDataDto{

    @IsNumber()
    count: number;
  
    @IsNumber()
    juniorSalary: number;
  
    @IsNumber()
    middleSalary: number;
  
    @IsNumber()
    seniorSalary: number;

    @IsDate()
    updatedAt: Date;
  }
  
  export class AdvantagesDataDto {
    @IsString()
    title: string;
  
    @IsString()
    description: string;
  }
  
  export class CreateTopPageDto {

    @IsEnum(TopLevelCategory)
    firstCategory: TopLevelCategory;
  
    @IsString()
    secondCategory: string;

    @IsString()
    category: string;
  
    @IsString()
    alias: string;
  
    @IsString()
    title: string;
  
    @IsOptional()
    @ValidateNested()
    @Type(()=>HhDataDto)
    hh?: HhDataDto
  
    @IsArray()
    @ValidateNested()
    @Type(()=>Array<AdvantagesDataDto>)
    advantages: Array<AdvantagesDataDto>;
  
    @IsString()
    seoText: string;
  
    @IsArray()
    @IsString({each:true})
    tags: Array<string>;
  
    @IsString()
    @IsOptional()
    tagsTitle?: string;
}