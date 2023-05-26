import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NiktoModule } from './nikto/nikto.module';
import { WebBusterService } from './web-buster/web-buster.service';
import { WebBuster } from './web-buster/web-buster';
import { WebBusterModule } from './web-buster/web-buster.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    NiktoModule,
    WebBusterModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, WebBusterService, WebBuster],
})
export class AppModule {}
