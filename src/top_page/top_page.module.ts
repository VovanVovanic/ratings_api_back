import { Module } from '@nestjs/common';
import { TopPageController } from './top_page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModel, TopPageSchema } from './top_page.model/top_page.model';

@Module({
  imports:[MongooseModule.forFeature([{name:TopPageModel.name, schema:TopPageSchema}])],
  controllers: [TopPageController]
})
export class TopPageModule {}
