import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { iTelegramModuleAsyncOptions } from './telegram_interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegramConst';

@Global()
@Module({})
export class TelegramModule {
  static forRootAsync(options:iTelegramModuleAsyncOptions):DynamicModule{
    const AsyncOptions =  this.createAsyncOptionsProvider(options)
    return{
      module:TelegramModule,
      imports:options.imports,
      providers:[TelegramService, AsyncOptions],
      exports:[TelegramService]
    }
  }
  private static createAsyncOptionsProvider(options:iTelegramModuleAsyncOptions):Provider{
    return{
     provide :TELEGRAM_MODULE_OPTIONS,
     useFactory: async(...args:Array<any>)=>{
      const config = await options.useFactory(...args)
      return config
     },
     inject: options.inject || []
    }

  }
}
