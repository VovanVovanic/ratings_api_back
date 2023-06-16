import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { format } from 'date-fns';
import * as sharp from 'sharp'
import { ensureDir, writeFile } from 'fs-extra';
import { FileElementResponse } from './dto/file_element.response';
import { MFile } from './mfile.class';

@Injectable()
export class FilesService {
    async uploadFile(files: Array<MFile>){
        const dateFolder = format(new Date(), 'yyyy-MM-dd')
        const uploadFolder  = `${path}/uploads/${dateFolder}`
        await ensureDir(uploadFolder)
        const res:Array<FileElementResponse> = [] 
        files.forEach( async (file)=>{
        await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
         res.push({url:`${dateFolder}/${file.originalname}`, name:`${file.originalname}`})
        })
        return res
    }
convertToWebP(file:Buffer){
    return sharp(file)
    .webp()
    .toBuffer()
}
}
