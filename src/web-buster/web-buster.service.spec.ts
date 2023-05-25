import { Test, TestingModule } from '@nestjs/testing';
import { WebBusterService } from './web-buster.service';

describe('WebBusterService', () => {
  let service: WebBusterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebBusterService],
    }).compile();

    service = module.get<WebBusterService>(WebBusterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
