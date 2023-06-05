import { ConfigService } from '@nestjs/config';

export default (configService: ConfigService) => ({
  port: configService.get<number>('PORT', 3001),
  dyssomniaApiUrl: configService.get<string>('DYSSOMNIA_API_URL'),
  database: {
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT', 5432),
  },
  api: {
    version: configService.get<string>('API_VERSION', 'v1'),
    prefix: configService.get<string>('API_PREFIX', 'api'),
  },
});
