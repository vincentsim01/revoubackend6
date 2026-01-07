import { Test, TestingModule } from '@nestjs/testing';
import { BookingsessionService } from './bookingsession.service';

describe('BookingsessionService', () => {
  let service: BookingsessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingsessionService],
    }).compile();

    service = module.get<BookingsessionService>(BookingsessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
