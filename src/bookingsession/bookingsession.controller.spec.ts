import { Test, TestingModule } from '@nestjs/testing';
import { BookingsessionController } from './bookingsession.controller';

describe('BookingsessionController', () => {
  let controller: BookingsessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsessionController],
    }).compile();

    controller = module.get<BookingsessionController>(BookingsessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
