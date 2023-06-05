import { Module } from '@nestjs/common';
import { NiktoService } from './nikto.service';
import { XmlToJson } from './nikto';
import { NiktoController } from './nikto.controller';
import { HttpService } from '../services/http.service';
import { ConfigModule } from '@nestjs/config';
import { WebhookService } from '../services/webhook.service';

@Module({
  imports: [ConfigModule],
  providers: [NiktoService, XmlToJson, HttpService, WebhookService],
  controllers: [NiktoController],
})
export class NiktoModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(RoutePrefixingMiddleware).forRoutes(NiktoController);
  // }
}
