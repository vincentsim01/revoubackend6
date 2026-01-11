import { PaymentService } from './payment.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
import { Role } from 'src/auth/decorators/roles.decorator';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Get()
  getAllPayments(@Query('status') status?: string) {
    if (status) {
      return this.paymentService.findByStatus(status);
    }
    return this.paymentService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Get('transaction/:transactionId')
  getPaymentsByTransactionId(@Param('transactionId') transactionId: string) {
    return this.paymentService.findByTransactionId(Number(transactionId));
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  getPayment(@Param('id') id: string) {
    return this.paymentService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  updatePayment(@Param('id') id: string, @Body() data: UpdatePaymentDto) {
    return this.paymentService.update(Number(id), data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Patch(':id/mark-paid')
  markAsPaid(@Param('id') id: string) {
    return this.paymentService.markAsPaid(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  deletePayment(@Param('id') id: string) {
    return this.paymentService.remove(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createPayment(@Body() body: CreatePaymentDto) {
    return this.paymentService.create(body);
  }
}