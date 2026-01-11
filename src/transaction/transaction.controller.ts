import { TransactionService } from './transaction.service';
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
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
import { Role } from 'src/auth/decorators/roles.decorator';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Get()
  getAllTransactions() {
    return this.transactionService.getAllTransactions();
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Get('user/:userId')
  getTransactionsByUserId(@Param('userId') userId: string) {
    return this.transactionService.getTransactionsByUserId(Number(userId));
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  getTransaction(@Param('id') id: string) {
    return this.transactionService.getTransactionById(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  updateTransaction(
    @Param('id') id: string,
    @Body() data: UpdateTransactionDto,
  ) {
    return this.transactionService.update(Number(id), data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteTransaction(@Param('id') id: string) {
    return this.transactionService.delete(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createTransaction(@Body() body: CreateTransactionDto) {
    return this.transactionService.createTransaction(body);
  }
}