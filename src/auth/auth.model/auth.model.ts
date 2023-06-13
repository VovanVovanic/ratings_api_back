import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose";
import { UserType } from "../const/authTypes";

export type AuthDocument = HydratedDocument<AuthModel>
@Schema({timestamps:true})
export class AuthModel{

@Prop({unique:true, required:true})
email:string;

@Prop({required:true})
passwordHash:string

@Prop({default:'User'})
role:UserType
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel)
