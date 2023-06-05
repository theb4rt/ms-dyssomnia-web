import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpService {
  private readonly baseUrl: string;
  private readonly token: string | undefined | null;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('DYSSOMNIA_API_URL');
    this.token = null;
  }

  async http(
    endpoint: string,
    { body, headers = {}, ...params }: HttpServiceRequestConfig,
  ): Promise<{ data: any; status: number }> {
    const requestHeaders = {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: this.token ? `Bearer ${this.token}` : undefined,
      ...headers,
    };

    try {
      console.log('this.baseUrl + endpoint', this.baseUrl + endpoint);
      const response = await axios.post(this.baseUrl + endpoint, body, {
        headers: requestHeaders,
        ...params,
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const { status, statusText, data } = axiosError.response || {};
        throw new ErrorWithStatus(
          status || 500,
          statusText || 'Internal Server Error',
          data !== undefined ? [data] : undefined,
        );
      }
      throw error;
    }
  }
}

class ErrorWithStatus extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data: any) {
    super(message);
    this.status = status;
    this.data = data;
  }

  toString() {
    return this.data ? JSON.stringify(this.data[0], null, 2) : '';
  }
}

interface HttpServiceRequestConfig extends AxiosRequestConfig {
  body?: any;
}
