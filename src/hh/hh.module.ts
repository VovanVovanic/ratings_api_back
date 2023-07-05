import { Module} from '@nestjs/common';
import { HhController } from './hh.controller';
import { HhService } from './hh.service';
import { TopPageService } from 'src/top_page/top_page.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [HhController],
  providers: [HhService],
  imports:[ HttpModule, ConfigModule],
  exports:[HhModule, HhService]
})
export class HhModule {}
