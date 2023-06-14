import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductModel } from './product.model/product.model';
import { FindProductDto } from './dto/find_product.dto';
import { CreateProductDto } from './dto/create_product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService:ProductService){}

    @UsePipes(new ValidationPipe)
    @Post('create')
    async create(@Param('id') id:string, @Body() dto: CreateProductDto){
        return await this.productService.create(dto)
    }

    @Delete('delete/:id')
    async delete(@Param('id') id:string){
        return await this.productService.delete(id)
    }

    @Patch('update/:id')
    async update(@Param('id') id:string, @Body() dto: ProductModel){
        return await this.productService.updateById(id, dto)
    }

    @Get('findById/:id')
    async findById(@Param('id',) id:string, @Body() dto:ProductModel){  
        return await this.productService.findById(id)
    }

    @UsePipes(new ValidationPipe)
    @HttpCode(200)
    @Post('findWithReviews')
    async findWithReviews(@Body() dto:FindProductDto){
        return this.productService.findWithReviews(dto)
    }
}
