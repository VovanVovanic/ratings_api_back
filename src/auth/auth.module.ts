import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, AuthSchema } from './auth.model/auth.model';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from 'src/configs/jwtConfig';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwtStrategy';


@Module({
  imports:[
    MongooseModule.forFeature([{name:AuthModel.name, schema:AuthSchema}]),
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory: getJWTConfig
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
