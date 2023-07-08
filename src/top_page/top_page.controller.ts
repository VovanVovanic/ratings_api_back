import { Body, Controller, Delete, Get, HttpCode, Logger, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TopPageModel } from './top_page.model/top_page.model';
import { FindProductDto } from 'src/product/dto/find_product.dto';
import { ProductModel } from 'src/product/product.model/product.model';
import { CreateTopPageDto } from './dto/create_top_page.dto';
import { TopPageService } from './top_page.service';
import { FindTopPageDto } from './dto/find_top_page.dto';
import { HhService } from 'src/hh/hh.service';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Controller('top_page')
export class TopPageController {
    constructor(
        private readonly topPageService:TopPageService,
        private readonly hhService:HhService,
        private readonly scheduleRegistry:SchedulerRegistry
        ){}

    @UsePipes(new ValidationPipe)
    @Post('create')
    async create(@Param('id') id:string, @Body() dto:CreateTopPageDto){
        return await this.topPageService.create(dto)
    }

    @Delete('delete/:id')
    async delete(@Param('id') id:string){
        return await this.topPageService.delete(id)
    }

    @Patch('update/:id')
    async update(@Param('id') id:string, @Body() dto: TopPageModel){
        return await this.topPageService.updateById(id, dto)
    }

    @Get('findById/:id')
    async getById(@Param('id') id:string){ 
        return await this.topPageService.findById(id)
    }

    @Get('findByAlias/:alias')
    async getByAlias(@Param('alias') alias:string){ 
        return await this.topPageService.findByAlias(alias)
    }

    @Get('findByText/:text')
    async getByText(@Param('text') text:string){ 
        return await this.topPageService.findByText(text)
    }

    @UsePipes(new ValidationPipe)
    @HttpCode(200)
    @Post('findByCategory')
    async findByCategory( @Body() dto:FindTopPageDto){
        return await this.topPageService.findByCategory(dto.firstCategory)
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {name: "test"})
    async test(){
        Logger.log('test')
        const job  = this.scheduleRegistry.getCronJob('test')
        const data = await this.topPageService.findForHhUpdate(new Date())
        for(let page of data){
            const hhData = await this.hhService.getData(page.category)
            page.hh = hhData;
            await this.topPageService.updateById(page._id, page)
            return page
        }
    }
}
