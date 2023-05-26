import { Module } from '@nestjs/common';
import { NiktoService } from './nikto.service';
import { Nikto, XmlToJson } from './nikto';
import { NiktoController } from './nikto.controller';

@Module({
  providers: [NiktoService, Nikto, XmlToJson],
  controllers: [NiktoController],
})
export class NiktoModule {}
