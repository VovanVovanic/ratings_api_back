
export enum TopLevelCategory{
    Courses,
    Services,
    Books,
    Products
}
export class TopPageModel {
firstCategory: TopLevelCategory;
secondCategory:string;
title:string;
hh?:{
    count:number;
    juniorSalary:number;
    middleSalary:number;
    seniorSalary:number;
};
advantages:Array<
{
    title:string;
    description:string
}>
seoText:string;
tags:Array<string>;
tagsTitle?:string;
}