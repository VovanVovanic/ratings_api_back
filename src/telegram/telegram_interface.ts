import { ModuleMetadata } from "@nestjs/common"

export interface ITelegramOptions{
    chatId:string
    token:string
}

export interface iTelegramModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'>{
    useFactory: (...args: Array<any>)=>Promise<ITelegramOptions> | ITelegramOptions
    inject?: Array<any>
}