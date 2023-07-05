import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ITelegramOptions } from './telegram_interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegramConst';

@Injectable()
export class TelegramService {
    bot:Telegraf
    options:ITelegramOptions
    constructor(
        @Inject(TELEGRAM_MODULE_OPTIONS) options:ITelegramOptions
    ){
        this.bot = new Telegraf(options.token),
        this.options = options
    }
    async sendNotification(message:string, chatId:string = this.options.chatId){
       const res =  await this.bot.telegram.sendMessage(chatId, message)
       console.log(res,"res")
    }
}
