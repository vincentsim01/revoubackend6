import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePaymentDto) {
    // build data object
    const data: any = {
      transactionId: dto.transactionId,
      provider: dto.provider,
      status: dto.status,
      amount: dto.amount,
    };

    // only set paidAt if it exists
    if (dto.paidAt) {
      data.paidAt = new Date(dto.paidAt); // convert ISO string to Date
    }

    return this.prisma.payment.create({ data });
  }
  

  findAll() {
    return this.prisma.payment.findMany({
      include: { transaction: true },
    });
  }

  findOne(id: number) {
    return this.prisma.payment.findUnique({
      where: { id },
      include: { transaction: true },
    });
  }

  update(id: number, dto: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: { id },
      data: dto,
    });
  }

  async markAsPaid(id: number) {
    const payment = await this.findOne(id);
    if (!payment) throw new NotFoundException('Payment not found');

    return this.prisma.payment.update({
      where: { id },
      data: {
        status: 'PAID',
        paidAt: new Date(),
      },
    });
  }

  remove(id: number) {
    return this.prisma.payment.delete({ where: { id } });
  }
}