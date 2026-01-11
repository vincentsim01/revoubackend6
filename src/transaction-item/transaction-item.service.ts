import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionItemRepository } from './transaction-item.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTransactionItemDto } from './dto/update-transaction-item.dto/update-transaction-item.dto';

@Injectable()
export class TransactionItemService {
  constructor(
    private readonly transactionItemRepo: TransactionItemRepository,
    private readonly prisma: PrismaService,
  ) {}

  getAllTransactionItems() {
    return this.transactionItemRepo.findAll();
  }

  getTransactionItemById(id: number) {
    return this.transactionItemRepo.findOne(id);
  }

  getTransactionItemsByTransactionId(transactionId: number) {
    return this.transactionItemRepo.findByTransactionId(transactionId);
  }

  getTransactionItemsByProductId(productId: number) {
    return this.transactionItemRepo.findByProductId(productId);
  }

  createTransactionItem(data: {
    transactionId: number;
    productId: number;
    quantity: number;
    price: number;
  }) {
    return this.transactionItemRepo.createTransactionItem(data);
  }

  update(id: number, data: UpdateTransactionItemDto) {
    return this.transactionItemRepo.update(id, data);
  }

  delete(id: number) {
    return this.transactionItemRepo.delete(id);
  }
}