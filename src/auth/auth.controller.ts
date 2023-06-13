import { BadRequestException, Body, Controller, HttpCode, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { ALREADY_EXIST, REGISTRATION_ERROR, UPDATE_ERROR, USER_EMAIL } from './const/authConst';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @UsePipes(new ValidationPipe)
    @Post('register')
    async register(@Body() dto:AuthDto){
        const oldUser = await this.authService.findUser(dto.email)
        if(oldUser){
           throw new BadRequestException(`${USER_EMAIL} ${dto.email} ${ALREADY_EXIST}`) 
        }
        else{
            const newUser = await this.authService.createUser(dto)
            if(!newUser){
                throw new HttpException(REGISTRATION_ERROR, HttpStatus.BAD_REQUEST)
            }
            else {
                return newUser
            }
        }
    }

    @UsePipes(new ValidationPipe)
    @HttpCode(200)
    @Post('login')
    async login(@Body() dto:AuthDto){
        const userEmail = await this.authService.validateUser(dto.email, dto.password)
        if(userEmail){
            return await this.authService.login(userEmail.email)
        }
    }

    @Post('update')
    async updateUser(@Body() dto:AuthDto){
        const updatedUser = this.authService.changeRole(dto.email, dto.role)
        if(!updatedUser){
            throw new HttpException(UPDATE_ERROR, HttpStatus.BAD_REQUEST)
        }
        else {
            return updatedUser
        }
    }
}
