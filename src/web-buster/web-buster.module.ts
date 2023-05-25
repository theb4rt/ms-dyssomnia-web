import { Module } from '@nestjs/common';
import { WebBusterController } from './web-buster.controller';

@Module({
  controllers: [WebBusterController],
})
export class WebBusterModule {}
