import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.models';
import { Model } from 'mongoose';
import { UserType } from './types/userTypes';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>) {}

    async getByEmail(email:string){
        return this.userModel.findOne({email})
    }

    async createUser(user:UserType){
        const newUser = new this.userModel({...user})
        return newUser.save()
    }
}
