import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const apiPrefix = configService.get<string>('api.prefix');
  const apiVersion = configService.get<string>('api.version');
  app.setGlobalPrefix(`${apiPrefix}/${apiVersion}`);
  await app.listen(port);
}
bootstrap();
