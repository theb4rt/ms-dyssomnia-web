import { Module } from '@nestjs/common';
import { NiktoService } from './nikto.service';
import { Nikto } from './nikto';
import { NiktoController } from './nikto.controller';

@Module({
  providers: [NiktoService, Nikto],
  controllers: [NiktoController],
})
export class NiktoModule {}
