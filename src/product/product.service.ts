import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, ProductModel } from './product.model/product.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create_product.dto';
import { PRODUCT_NOT_FOUND, PRODUCT_NOT_UPDATED, PRODUCT_WASNT_CREATED } from './const/prtoductConsts';
import { FindProductDto } from './dto/find_product.dto';
import { ReviewModel } from 'src/review/review.model/review.model';

@Injectable()
export class ProductService {
    constructor(@InjectModel(ProductModel.name) private productModel:Model<ProductDocument>){}

    async create(dto: CreateProductDto){
        const newProduct = await this.productModel.create(dto)
        if(!newProduct){
            throw new HttpException(PRODUCT_WASNT_CREATED, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        else{
            return newProduct
        }
    }

    async delete(id:string){
        const deletedProduct = await this.productModel.findByIdAndDelete(id)

        if(!deletedProduct){
            throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        else{
            return deletedProduct
        }
    }

    async updateById(id:string,dto: ProductModel){
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, dto, {new:true})

        if(!updatedProduct){
            throw new HttpException(PRODUCT_NOT_UPDATED, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        else{
            return updatedProduct
        }
    }

    async findById(id:string){  
        const product = await this.productModel.findById(id)
        if(!product){
            throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        else{
            return product
        }
    }

    async findWithReviews(dto:FindProductDto){
        const productsWithReviews = this.productModel.aggregate([
            {
                $match: { categories: dto.category }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $limit: dto.limit
            },

            {
                $lookup: {
                    from: 'reviewmodels',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'reviews'
                }
            },
            {
                $addFields: {
                    reviewCount: { $size: '$reviews' },
                    reviewAverage: { $avg: '$reviews.rating' },
                    // reviews:{
                    //     $function: {
                    //         body: `function(reviews){
                    //             return reviews.sort((a,b)=> new Date(b.createdAt) - new Date (a.createdAt))
                    //         }`,
                    //         arguments:['$reviews'],
                    //         lang:'js'
                    //     }
                    // }
                }
            }
        ]).exec() as unknown as Array<ProductModel & {reviews: Array<ReviewModel>, reviewCount:string, reviewAverage:string}> 

        if(!productsWithReviews){
            throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        else{
            return productsWithReviews
        }
    }
}
