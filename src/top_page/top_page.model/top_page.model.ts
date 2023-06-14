import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}
export class HhData{

  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}

export class AdvantagesData {
  @Prop()
  title: string;

  @Prop()
  description: string;
}
export type TopPageDocument = HydratedDocument<TopPageModel>

@Schema({timestamps:true})
export class TopPageModel {
  @Prop({enum:TopLevelCategory})
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop({unique:true, required:true, index:true})
  alias: string;

  @Prop()
  title: string;

  @Prop()
  hh?: HhData

  @Prop()
  advantages: Array<AdvantagesData>;

  @Prop()
  seoText: string;

  @Prop()
  tags: Array<string>;

  @Prop()
  tagsTitle?: string;
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel)
