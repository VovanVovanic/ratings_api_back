import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewDocument, ReviewModel } from './review.model/review.model';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/createReview.dto';

let productId = new Types.ObjectId().toHexString()
@Injectable()
export class ReviewService {
    constructor(@InjectModel(ReviewModel.name) private reviewModel:Model<ReviewDocument>){}

    async create(dto:CreateReviewDto){
        const productId = new Types.ObjectId(dto.productId)
        const newReview = new this.reviewModel({...dto, productId})
        await newReview.save()
        return newReview
        }

    async delete(id:string){
        const res = await this.reviewModel.findByIdAndDelete(id)
        return res
    }

    async getByProductId(productId:string){
        const res = await this.reviewModel.find({productId})
        return res
    }

    async deleteByProductId(productId:string){
       return this.reviewModel.deleteMany({productId})}
}
