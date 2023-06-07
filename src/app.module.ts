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


@Module({
  imports: [
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
    UserModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
