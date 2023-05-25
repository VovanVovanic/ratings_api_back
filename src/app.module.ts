import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';
import { TopPageModule } from './top_page/top_page.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, ReviewModule, TopPageModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
