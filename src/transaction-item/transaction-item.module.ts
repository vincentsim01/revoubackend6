import { Module } from '@nestjs/common';
import { TransactionItemService } from './transaction-item.service';
import { TransactionItemController } from './transaction-item.controller';

@Module({
  providers: [TransactionItemService],
  controllers: [TransactionItemController]
})
export class TransactionItemModule {}
