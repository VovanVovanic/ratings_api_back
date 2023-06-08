import{ConfigService} from '@nestjs/config'
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose'

export const getMongoConfig = async (configService:ConfigService):Promise<MongooseModuleFactoryOptions> =>{

    return {
        uri:getMongoString(configService),
        ...getMongoOptions()
    }
}

const getMongoString = (configService:ConfigService) => 
    'mongodb+srv://' +
    configService.get('MONGO_LOGIN') +
    ':' +
    configService.get('MONGO_PASSWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    '/reviews' +
    '?' +
    'retryWrites=true&w=majority'

    const getMongoOptions = () =>{
        return{
            useNewUrlParser: true,
            useUnifiedTopology:true
        }
    }