import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NiktoModule } from './nikto/nikto.module';
import { WebBusterService } from './web-buster/web-buster.service';
import { WebBuster } from './web-buster/web-buster';
import { WebBusterModule } from './web-buster/web-buster.module';

@Module({
  imports: [NiktoModule, WebBusterModule],
  controllers: [AppController],
  providers: [AppService, WebBusterService, WebBuster],
})
export class AppModule {}
