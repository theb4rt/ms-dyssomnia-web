import { Test, TestingModule } from '@nestjs/testing';
import { XmlToJson } from './nikto';

describe('Nikto', () => {
  let provider: XmlToJson;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XmlToJson],
    }).compile();

    provider = module.get<XmlToJson>(XmlToJson);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
