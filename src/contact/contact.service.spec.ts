import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { ContactRepository } from './contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';

describe('ContactService', () => {
  let service: ContactService;
  let repo: jest.Mocked<ContactRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: ContactRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ContactService>(ContactService);
    repo = module.get(ContactRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a contact', async () => {
      const dto: CreateContactDto = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const result = { id: 1, ...dto };

      repo.create.mockResolvedValue(result as any);

      expect(await service.create(dto)).toEqual(result);
      expect(repo.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all contacts', async () => {
      const result = [{ id: 1, name: 'John' }];

      repo.findAll.mockResolvedValue(result as any);

      expect(await service.findAll()).toEqual(result);
      expect(repo.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single contact', async () => {
      const result = { id: 1, name: 'John' };

      repo.findOne.mockResolvedValue(result as any);

      expect(await service.findOne(1)).toEqual(result);
      expect(repo.findOne).toHaveBeenCalledWith(1);
    });
  });
});
