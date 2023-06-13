import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, AuthModel } from './auth.model/auth.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { UserType } from './const/authTypes';
import { NOT_FOUND, USER_EMAIL, WRONG_PASSWORD } from './const/authConst';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(AuthModel.name) private authModel:Model<AuthDocument>,
        private readonly jwtService: JwtService
        ){}

    async createUser(dto:AuthDto){
        const{email, password, role} = dto
        const salt = genSaltSync(10)
        const newUser = new this.authModel({email, role, passwordHash: hashSync(password,salt)})
        await newUser.save()
        return newUser
    }

    async findUser(email:string){
        const foundUser = await this.authModel.findOne({email})
        return foundUser
    }

    async changeRole(email:string, role:UserType){
        const updatedUser = await this.authModel.findOneAndUpdate({email}, {role},{new:true})
        return updatedUser
    }
    async validateUser(email:string, password:string){
        const user = await this.findUser(email)
        if(!user){
            throw new UnauthorizedException(`${USER_EMAIL} ${email} ${NOT_FOUND}`)
        }
        const isValidPassword = await compare(password, user.passwordHash)
        if(!isValidPassword){
            throw new UnauthorizedException(WRONG_PASSWORD)
        }
        return {email:user.email}
    }
    async login(email:string){
        const payload = {
            email
        }
        return{
            token: await this.jwtService.signAsync(payload)
        }
    }
}
