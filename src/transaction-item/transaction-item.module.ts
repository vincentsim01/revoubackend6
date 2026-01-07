import { Module } from '@nestjs/common';
import { TransactionItemService } from './transaction-item.service';
import { TransactionItemController } from './transaction-item.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionItemRepository } from './transaction-item.repository';

@Module({
  providers: [TransactionItemService, PrismaService, TransactionItemRepository],
  controllers: [TransactionItemController]
})
export class TransactionItemModule {}
