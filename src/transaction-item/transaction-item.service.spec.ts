import { Test, TestingModule } from '@nestjs/testing';
import { TransactionItemService } from './transaction-item.service';
import { TransactionItemRepository } from './transaction-item.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTransactionItemDto } from './dto/update-transaction-item.dto/update-transaction-item.dto';
import { Decimal } from '@prisma/client/runtime/library';

describe('TransactionItemService', () => {
  let service: TransactionItemService;
  let repo: jest.Mocked<TransactionItemRepository>;

  const mockTransactionItem = {
    id: 1,
    transactionId: 10,
    productId: 5,
    quantity: 2,
    price: new Decimal(99.99),
  };

  const transactionItemRepoMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByTransactionId: jest.fn(),
    findByProductId: jest.fn(),
    createTransactionItem: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const prismaServiceMock = {}; // required for DI only

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionItemService,
        {
          provide: TransactionItemRepository,
          useValue: transactionItemRepoMock,
        },
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<TransactionItemService>(TransactionItemService);
    repo = module.get(TransactionItemRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllTransactionItems', () => {
    it('should return all transaction items', async () => {
      repo.findAll.mockResolvedValue([mockTransactionItem] as any);

      const result = await service.getAllTransactionItems();

      expect(repo.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockTransactionItem]);
    });
  });

  describe('getTransactionItemById', () => {
    it('should return transaction item by id', async () => {
      repo.findOne.mockResolvedValue(mockTransactionItem as any);

      const result = await service.getTransactionItemById(1);

      expect(repo.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTransactionItem);
    });
  });

  describe('getTransactionItemsByTransactionId', () => {
    it('should return transaction items by transactionId', async () => {
      repo.findByTransactionId.mockResolvedValue([mockTransactionItem] as any);

      const result = await service.getTransactionItemsByTransactionId(10);

      expect(repo.findByTransactionId).toHaveBeenCalledWith(10);
      expect(result).toEqual([mockTransactionItem]);
    });
  });

  describe('getTransactionItemsByProductId', () => {
    it('should return transaction items by productId', async () => {
      repo.findByProductId.mockResolvedValue([mockTransactionItem] as any);

      const result = await service.getTransactionItemsByProductId(5);

      expect(repo.findByProductId).toHaveBeenCalledWith(5);
      expect(result).toEqual([mockTransactionItem]);
    });
  });

  describe('createTransactionItem', () => {
    it('should create a transaction item', async () => {
      const data = {
        transactionId: 10,
        productId: 5,
        quantity: 2,
        price: 99.99,
      };

      repo.createTransactionItem.mockResolvedValue(mockTransactionItem as any);

      const result = await service.createTransactionItem(data);

      expect(repo.createTransactionItem).toHaveBeenCalledWith(data);
      expect(result).toEqual(mockTransactionItem);
    });
  });

  describe('update', () => {
    it('should update a transaction item', async () => {
      const dto: UpdateTransactionItemDto = { quantity: 3 };

      repo.update.mockResolvedValue({
        ...mockTransactionItem,
        quantity: 3,
      } as any);

      const result = await service.update(1, dto);

      expect(repo.update).toHaveBeenCalledWith(1, dto);
      expect(result.quantity).toBe(3);
    });
  });

  describe('delete', () => {
    it('should delete a transaction item', async () => {
      repo.delete.mockResolvedValue({ deleted: true } as any);

      const result = await service.delete(1);

      expect(repo.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ deleted: true });
    });
  });
});
