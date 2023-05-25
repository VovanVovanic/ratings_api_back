import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put } from '@nestjs/common';
import { ProductModel } from './product.model/product.model';
import { FindProductDto } from './dto/find_product.dto';

@Controller('product')
export class ProductController {

    @Post('create')
    async create(@Param('id') id:string, @Body() dto: Omit<ProductModel, '_id'>){

    }

    @Delete(':id')
    async delete(@Param('id') id:string){
    }

    @Patch('update')
    async update(@Param('id') id:string, @Body() dto: ProductModel){
        
    }

    @Get(':id')
    async get(@Body() dto:ProductModel){  
    }

    @HttpCode(200)
    @Post()
    async find_product(@Body() dto:FindProductDto){

    }
}
