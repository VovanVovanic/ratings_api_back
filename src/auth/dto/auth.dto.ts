import { IsEmail, IsString,MinLength } from "class-validator";
import { UserType } from "../const/authTypes";

export class AuthDto{
    
    @IsString()
    @IsEmail()
    email:string;

    @MinLength(4)
    @IsString()
    password:string

    role:UserType
}