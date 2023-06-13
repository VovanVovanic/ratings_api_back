import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthModel } from "../auth.model/auth.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly configService:ConfigService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:true,
            secretOrKey: configService.get('SECRET_JWT')
        })
    }
    async validate({email}:Pick<AuthModel, 'email'>){
        return email
    }
}