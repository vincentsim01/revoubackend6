import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepo: PaymentRepository) {}

  create(dto: CreatePaymentDto) {
    return this.paymentRepo.create(dto);
  }

  findAll() {
    return this.paymentRepo.findAll();
  }

  findOne(id: number) {
    return this.paymentRepo.findOne(id);
  }

  findByTransactionId(transactionId: number) {
    return this.paymentRepo.findByTransactionId(transactionId);
  }

  findByStatus(status: string) {
    return this.paymentRepo.findByStatus(status);
  }

  update(id: number, dto: UpdatePaymentDto) {
    return this.paymentRepo.update(id, dto);
  }

  async markAsPaid(id: number) {
    const payment = await this.paymentRepo.findOne(id);
    if (!payment) throw new NotFoundException('Payment not found');
    return this.paymentRepo.markAsPaid(id);
  }

  remove(id: number) {
    return this.paymentRepo.remove(id);
  }
}