import { TransactionItemService } from './transaction-item.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateTransactionItemDto } from './dto/update-transaction-item.dto/update-transaction-item.dto';
import { CreateTransactionItemDto } from './dto/create-transaction-item.dto/create-transaction-item.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
import { Role } from 'src/auth/decorators/roles.decorator';

@Controller('transaction-items')
export class TransactionItemController {
  constructor(private readonly transactionItemService: TransactionItemService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Get()
  getAllTransactionItems() {
    return this.transactionItemService.getAllTransactionItems();
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Get('transaction/:transactionId')
  getTransactionItemsByTransactionId(
    @Param('transactionId') transactionId: string,
  ) {
    return this.transactionItemService.getTransactionItemsByTransactionId(
      Number(transactionId),
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Get('product/:productId')
  getTransactionItemsByProductId(@Param('productId') productId: string) {
    return this.transactionItemService.getTransactionItemsByProductId(
      Number(productId),
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  getTransactionItem(@Param('id') id: string) {
    return this.transactionItemService.getTransactionItemById(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  updateTransactionItem(
    @Param('id') id: string,
    @Body() data: UpdateTransactionItemDto,
  ) {
    return this.transactionItemService.update(Number(id), data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteTransactionItem(@Param('id') id: string) {
    return this.transactionItemService.delete(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createTransactionItem(@Body() body: CreateTransactionItemDto) {
    return this.transactionItemService.createTransactionItem(body);
  }
}