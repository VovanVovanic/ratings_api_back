import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export class ProductCharacteristic{
    @Prop()
    name:string

    @Prop()
    value:string
}
export type ProductDocument = HydratedDocument<ProductModel>
@Schema({timestamps:true})
export class ProductModel {
    @Prop()
    image:string;

    @Prop()
    title:string;

    @Prop()
    name1:string;

    @Prop()
    price:number;

    @Prop()
    oldPrice?:number;

    @Prop()
    credit:number;

    @Prop()
    rating:number;

    @Prop()
    description:string;

    @Prop()
    advantages:string;

    @Prop()
    disadvantages:string;

    @Prop({type: ()=>Array<string>})
    categories:Array<string>

    @Prop({type: ()=>Array<string>})
    tags:Array<string>;

    @Prop({type:()=>Array<ProductCharacteristic>})
    characteristics:Array<ProductCharacteristic>
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel)