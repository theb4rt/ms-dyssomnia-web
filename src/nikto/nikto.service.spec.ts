import { Test, TestingModule } from '@nestjs/testing';
import { NiktoService } from './nikto.service';

describe('NiktoService', () => {
  let service: NiktoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NiktoService],
    }).compile();

    service = module.get<NiktoService>(NiktoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
