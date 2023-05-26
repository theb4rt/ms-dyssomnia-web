import { Body, Controller, Post } from '@nestjs/common';
import { NiktoService } from './nikto.service';
import { NiktoDTO } from './nikto.dto';

@Controller('nikto')
export class NiktoController {
  constructor(private readonly niktoService: NiktoService) {}

  @Post()
  async runNikto(@Body() data: NiktoDTO) {
    const { host } = data;
    this.niktoService.targetUrl = host;
    const result = await this.niktoService.runNikto();
    return result;
  }
}
