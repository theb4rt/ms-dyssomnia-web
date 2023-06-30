import { Body, Controller, Post } from '@nestjs/common';
import { NiktoService } from './nikto.service';
import { NiktoDTO } from './nikto.dto';

@Controller('/web/nikto')
export class NiktoController {
  constructor(private readonly niktoService: NiktoService) {}

  @Post()
  async runNikto(@Body() data: NiktoDTO) {
    const { host, max_time, user_id } = data;

    this.niktoService.targetUrl = host;
    this.niktoService.maxTime = max_time;
    this.niktoService.userId = user_id;
    const result = await this.niktoService.runNikto();
    return result;
  }
}
