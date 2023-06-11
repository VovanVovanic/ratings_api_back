import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/createReview.dto';
import { ReviewService } from './review.service';
import { NOTHING_IS_FOUND, REVIEW_NOT_FOUND } from './constants';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService:ReviewService){}
    @Post('create')
    async create(@Param('id') id:string, @Body() dto: CreateReviewDto){
        const res = await this.reviewService.create(dto)
        return res
    }

    @Delete('delete/:id')
    async delete(@Param('id') id:string){
        const deletedReview = await this.reviewService.delete(id)
        if(!deletedReview){
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        else{
            return deletedReview
        }
    }

    @Get('byProduct/:productId')
    async getByProductId(@Param('productId') productId:string){
        const products = await this.reviewService.getByProductId(productId)
        if(!products){
            throw new HttpException(NOTHING_IS_FOUND, HttpStatus.NOT_FOUND)
        }
        else {
            return products
        }
    }
    @Delete('deleteByProduct/:productId')
    async deleteByProductId(@Param('productId') productId:string){
       const res = await this.reviewService.deleteByProductId(productId)
        return res
    }
}
