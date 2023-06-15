import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopLevelCategory, TopPageDocument, TopPageModel } from './top_page.model/top_page.model';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create_top_page.dto';
import { ALREADY_EXIST, PAGE_NOT_FOUND, PAGE_NOT_UPDATED, PAGE_WASNT_CREATED, THE_PAGE } from './const/topPageConst';

@Injectable()
export class TopPageService {
    constructor(@InjectModel(TopPageModel.name) private topPageModel:Model<TopPageDocument>){}

    async create(dto: CreateTopPageDto){
        const oldPage = await this.topPageModel.findOne({alias:dto.alias})
        if(oldPage){
            throw new HttpException(`${THE_PAGE} '${dto.alias}' ${ALREADY_EXIST}`, HttpStatus.BAD_REQUEST) 
        }
        else{
            const newPage = await this.topPageModel.create(dto)
            if(!newPage){
                throw new HttpException(PAGE_WASNT_CREATED, HttpStatus.INTERNAL_SERVER_ERROR)
            }
            else{
                return newPage
            }
        }

    }
    async delete(id:string){
        const deletedPage = await this.topPageModel.findByIdAndDelete(id)

        if(!deletedPage){
            throw new HttpException(PAGE_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        else{
            return deletedPage
        }


    }

    async updateById(id:string,dto: TopPageModel){
        const updatedPage = await this.topPageModel.findByIdAndUpdate(id, dto, {new:true})

        if(!updatedPage){
            throw new HttpException(PAGE_NOT_UPDATED, HttpStatus.NOT_MODIFIED)
        }
        else{
            return updatedPage
        }
    }
    async findById(id:string){
        const foundPage = await this.topPageModel.findById(id)

        if(!foundPage){
            throw new HttpException(PAGE_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        else{
            return foundPage
        }
    }

    async findByAlias(alias:string){
        const foundPage = await this.topPageModel.findOne({alias})

        if(!foundPage){
            throw new HttpException(PAGE_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        else{
            return foundPage
        }
    }

    async findByCategory(firstCategory:TopLevelCategory){
        const foundPages = await this.topPageModel.aggregate([
            {
                $match:{firstCategory}
            },
            {
                $group:{
                    _id:{secondCategory:'$secondCategory'},
                    pages:{
                        $push:{alias:'$alias',title:'$title'}
                    }
                }
            }
        ])
            return foundPages
    }

    async findByText(text:string){
        const res = await this.topPageModel.find({$text:{$search:text, $caseSensitive:false, $language:'english'}})
            return res
    }
}
