import { Test, TestingModule } from '@nestjs/testing';
import { NiktoController } from './nikto.controller';

describe('NiktoController', () => {
  let controller: NiktoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NiktoController],
    }).compile();

    controller = module.get<NiktoController>(NiktoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
