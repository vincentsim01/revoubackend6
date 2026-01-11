import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePaymentDto) {
    const paymentData: any = {
      transactionId: data.transactionId,
      provider: data.provider,
      status: data.status,
      amount: data.amount,
    };

    if (data.paidAt) {
      paymentData.paidAt = new Date(data.paidAt);
    }

    return this.prisma.payment.create({
      data: paymentData,
      include: {
        transaction: {
          include: {
            user: true,
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.payment.findMany({
      include: {
        transaction: {
          include: {
            user: true,
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.payment.findUnique({
      where: { id },
      include: {
        transaction: {
          include: {
            user: true,
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  }

  findByTransactionId(transactionId: number) {
    return this.prisma.payment.findMany({
      where: { transactionId },
      include: {
        transaction: {
          include: {
            user: true,
            items: true,
          },
        },
      },
    });
  }

  findByStatus(status: string) {
    return this.prisma.payment.findMany({
      where: { status },
      include: {
        transaction: true,
      },
    });
  }

  update(id: number, data: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: { id },
      data,
      include: {
        transaction: {
          include: {
            user: true,
            items: true,
          },
        },
      },
    });
  }

  markAsPaid(id: number) {
    return this.prisma.payment.update({
      where: { id },
      data: {
        status: 'PAID',
        paidAt: new Date(),
      },
      include: {
        transaction: {
          include: {
            user: true,
            items: true,
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.payment.delete({
      where: { id },
    });
  }
}