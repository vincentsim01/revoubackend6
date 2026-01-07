import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionRepository } from './transaction.repository';

@Module({
  providers: [TransactionService, PrismaService, TransactionRepository],
  controllers: [TransactionController]
})
export class TransactionModule {}
