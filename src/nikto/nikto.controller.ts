import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { NiktoService } from './nikto.service';
import { NiktoDTO } from './nikto.dto';
import { JwtAuthGuard } from '../auth/jwt-guard';

@Controller('/web/nikto')
export class NiktoController {
  constructor(private readonly niktoService: NiktoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async runNikto(@Body() data: NiktoDTO, @Req() req) {
    const { host, max_time } = data;
    this.niktoService.targetUrl = host;
    this.niktoService.maxTime = max_time;
    this.niktoService.userId = req.user.sub;

    const result = await this.niktoService.runNikto();
    return result;
  }
}
