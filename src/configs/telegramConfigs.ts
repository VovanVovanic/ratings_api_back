import { ConfigService } from "@nestjs/config";

export const getTelegramConfigs = (configService:ConfigService) =>{
    const token = configService.get('TELEGRAM_TOKEN')
    if(!token){
        throw new Error('TELEGRAM_TOKEN is not set')
    }
    return{
        token:"5952765726:AAFpVj5My1gQHIqJxCsg05Lql5FOjAq3_EM",
        chatId: "800818066"
    }
}