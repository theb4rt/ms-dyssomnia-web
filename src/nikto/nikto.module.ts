import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { NiktoService } from './nikto.service';
import { XmlToJson } from './nikto';
import { NiktoController } from './nikto.controller';
import { HttpService } from '../services/httpService';
import { RoutePrefixingMiddleware } from '../route-prefixing';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [NiktoService, XmlToJson, HttpService],
  controllers: [NiktoController],
})
export class NiktoModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(RoutePrefixingMiddleware).forRoutes(NiktoController);
  // }
}
