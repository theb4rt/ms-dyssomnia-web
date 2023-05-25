import { Test, TestingModule } from '@nestjs/testing';
import { WebBuster } from './web-buster';

describe('WebBuster', () => {
  let provider: WebBuster;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebBuster],
    }).compile();

    provider = module.get<WebBuster>(WebBuster);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
