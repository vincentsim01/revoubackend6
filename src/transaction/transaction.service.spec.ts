import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepo: TransactionRepository) {}

  getAllTransactions() {
    return this.transactionRepo.findAll();
  }

  getTransactionById(id: number) {
    return this.transactionRepo.findOne(id);
  }

  getTransactionsByUserId(userId: number) {
    return this.transactionRepo.findByUserId(userId);
  }

  createTransaction(data: { userId: number; total: number | string }) {
    if (typeof data.total === 'number' && data.total <= 0) {
      throw new BadRequestException('Total must be greater than 0');
    }
    return this.transactionRepo.createTransaction(data);
  }

  update(id: number, data: UpdateTransactionDto) {
    return this.transactionRepo.update(id, data);
  }

  delete(id: number) {
    return this.transactionRepo.delete(id);
  }
}

