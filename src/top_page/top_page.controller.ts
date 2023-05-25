import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { FindProductDto } from 'src/product/dto/find_product.dto';
import { ProductModel } from 'src/product/product.model/product.model';
import { TopPageModel } from './top_page.model/top_page.model';

@Controller('top-page')
export class TopPageController {
    @Post('create')
    async create(@Param('id') id:string, @Body() dto: Omit<TopPageModel, '_id'>){

    }

    @Delete(':id')
    async delete(@Param('id') id:string){
    }

    @Patch('update')
    async update(@Param('id') id:string, @Body() dto: TopPageModel){
        
    }

    @Get(':id')
    async get(@Body() dto:ProductModel){  
    }

    @HttpCode(200)
    @Post()
    async find_product(@Body() dto:FindProductDto){

    }
}
