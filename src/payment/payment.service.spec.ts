import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRepository } from './payment.repository';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

describe('PaymentService', () => {
  let service: PaymentService;
  let repo: jest.Mocked<PaymentRepository>;

  const mockPayment = {
    id: 1,
    transactionId: 1001,
    status: 'pending',
  };

  const paymentRepositoryMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByTransactionId: jest.fn(),
    findByStatus: jest.fn(),
    update: jest.fn(),
    markAsPaid: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: PaymentRepository,
          useValue: paymentRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    repo = module.get(PaymentRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a payment', async () => {
      const dto: CreatePaymentDto = {} as CreatePaymentDto;
      repo.create.mockResolvedValue(mockPayment as any);

      const result = await service.create(dto);

      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockPayment);
    });
  });

  describe('findAll', () => {
    it('should return all payments', async () => {
      repo.findAll.mockResolvedValue([mockPayment] as any);

      const result = await service.findAll();

      expect(repo.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockPayment]);
    });
  });

  describe('findOne', () => {
    it('should return a payment by id', async () => {
      repo.findOne.mockResolvedValue(mockPayment as any);

      const result = await service.findOne(1);

      expect(repo.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockPayment);
    });
  });

  describe('findByTransactionId', () => {
    it('should return payment by transaction id', async () => {
      repo.findByTransactionId.mockResolvedValue(mockPayment as any);

      const result = await service.findByTransactionId(1001);

      expect(repo.findByTransactionId).toHaveBeenCalledWith(1001);
      expect(result).toEqual(mockPayment);
    });
  });

  describe('findByStatus', () => {
    it('should return payments by status', async () => {
      repo.findByStatus.mockResolvedValue([mockPayment] as any);

      const result = await service.findByStatus('pending');

      expect(repo.findByStatus).toHaveBeenCalledWith('pending');
      expect(result).toEqual([mockPayment]);
    });
  });

  describe('update', () => {
    it('should update a payment', async () => {
      const dto: UpdatePaymentDto = {} as UpdatePaymentDto;
      repo.update.mockResolvedValue(mockPayment as any);

      const result = await service.update(1, dto);

      expect(repo.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual(mockPayment);
    });
  });

  describe('markAsPaid', () => {
    it('should mark payment as paid', async () => {
      repo.findOne.mockResolvedValue(mockPayment as any);
      repo.markAsPaid.mockResolvedValue({ ...mockPayment, status: 'paid' } as any);

      const result = await service.markAsPaid(1);

      expect(repo.findOne).toHaveBeenCalledWith(1);
      expect(repo.markAsPaid).toHaveBeenCalledWith(1);
      expect(result.status).toBe('paid');
    });

    it('should throw NotFoundException if payment does not exist', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.markAsPaid(999)).rejects.toThrow(NotFoundException);
      expect(repo.markAsPaid).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a payment', async () => {
      repo.remove.mockResolvedValue({ deleted: true } as any);

      const result = await service.remove(1);

      expect(repo.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual({ deleted: true });
    });
  });
});
