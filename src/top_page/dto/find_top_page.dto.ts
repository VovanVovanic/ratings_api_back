import { IsEnum } from "class-validator";
import { TopLevelCategory } from "../top_page.model/top_page.model";

export class FindTopPageDto{

    @IsEnum(TopLevelCategory)
    firstCategory: TopLevelCategory;
}