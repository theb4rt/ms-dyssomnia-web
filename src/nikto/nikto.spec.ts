import { Test, TestingModule } from '@nestjs/testing';
import { Nikto } from './nikto';

describe('Nikto', () => {
  let provider: Nikto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Nikto],
    }).compile();

    provider = module.get<Nikto>(Nikto);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
