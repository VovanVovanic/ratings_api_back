import { Module } from '@nestjs/common';
import { TopPageController } from './top_page.controller';

@Module({
  controllers: [TopPageController]
})
export class TopPageModule {}
