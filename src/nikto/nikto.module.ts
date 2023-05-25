import { Module } from '@nestjs/common';
import { NiktoService } from './nikto.service';
import { Nikto } from './nikto';

@Module({
  providers: [NiktoService, Nikto]
})
export class NiktoModule {}
