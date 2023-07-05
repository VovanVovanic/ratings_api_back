import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';
import { TopPageModule } from './top_page/top_page.module';
import { ProductModule } from './product/product.module';
import{ConfigModule, ConfigService} from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { getMongoConfig } from './configs/mongoConfig';
import { FilesModule } from './files/files.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { TelegramModule } from './telegram/telegram.module';
import { getTelegramConfigs } from './configs/telegramConfigs';
import { HhModule } from './hh/hh.module';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    AuthModule,
    ReviewModule, 
    TopPageModule, 
    ProductModule,
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: getMongoConfig
    }),
    UserModule,
    FilesModule,
    SitemapModule,
    TelegramModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: getTelegramConfigs
    }),
    HhModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
