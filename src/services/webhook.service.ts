import { HttpService } from './http.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhookService {
  constructor(private readonly httpService: HttpService) {}

  async sendWebhookNikto(url: string, payload: any) {
    try {
      await this.httpService.http(url, {
        body: payload,
      });
      console.log('Webhook request successful');
    } catch (error) {
      console.error('Error sending webhook:', error);
      console.log(error.toString());
    }
  }
}
