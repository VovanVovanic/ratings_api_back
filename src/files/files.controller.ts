import { Controller, HttpCode, HttpException, HttpStatus, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FileElementResponse } from './dto/file_element.response';
import { FilesService } from './files.service';
import { FILE_NOT_UPLOADED } from './consts/filesConsts';
import { MFile } from './mfile.class';


@Controller('files')
export class FilesController {
constructor(private readonly filesService:FilesService){}
    @Post('upload')
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(JwtGuard)
    async uploadFile(@UploadedFile() file: Express.Multer.File){
        const saveArr:Array<MFile> = [new MFile(file)]
        if(file.mimetype.includes('image')){
           
           const buffer = await this.filesService.convertToWebP(file.buffer)
            saveArr.push(new MFile({originalname:`${file.originalname.split('.')[0]}.webp`,buffer}))
        }
        const res = await this.filesService.uploadFile(saveArr)
        if(!res){
            throw new HttpException(FILE_NOT_UPLOADED, HttpStatus.BAD_REQUEST)
        }
        return res
    }
   
}
