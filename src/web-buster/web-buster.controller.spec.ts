import { Test, TestingModule } from '@nestjs/testing';
import { WebBusterController } from './web-buster.controller';

describe('WebBusterController', () => {
  let controller: WebBusterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebBusterController],
    }).compile();

    controller = module.get<WebBusterController>(WebBusterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
