import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(data: { userId: number; total: number | string }) {
    return this.prisma.transaction.create({
      data: {
        userId: data.userId,
        total: data.total,
      },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
        bookings: true,
      },
    });
  }

  findAll() {
    return this.prisma.transaction.findMany({
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
        bookings: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.transaction.findUnique({
      where: { id },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
        bookings: true,
      },
    });
  }

  findByUserId(userId: number) {
    return this.prisma.transaction.findMany({
      where: { userId },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
        bookings: true,
      },
    });
  }

  update(id: number, data: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { id },
      data,
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
        bookings: true,
      },
    });
  }

  delete(id: number) {
    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}