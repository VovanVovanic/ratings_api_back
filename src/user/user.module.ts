import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.models';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name, schema:UserSchema}])],
  providers: [UserService] 
})
export class UserModule {}
