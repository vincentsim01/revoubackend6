import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { UpdateTransactionItemDto } from './dto/update-transaction-item.dto/update-transaction-item.dto';

@Injectable()
export class TransactionItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTransactionItem(data: {
    transactionId: number;
    productId: number;
    quantity: number;
    price: Decimal|number;
  }) {
    return this.prisma.transactionItem.create({
      data: {
        transactionId: data.transactionId,
        productId: data.productId,
        quantity: data.quantity,
        price: data.price,
      },
      include: {
        product: true,
        transaction: true,
        booking: true,
      },
    });
  }

  findAll() {
    return this.prisma.transactionItem.findMany({
      include: {
        product: true,
        transaction: {
          include: {
            user: true,
          },
        },
        booking: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.transactionItem.findUnique({
      where: { id },
      include: {
        product: true,
        transaction: true,
        booking: true,
      },
    });
  }

  findByTransactionId(transactionId: number) {
    return this.prisma.transactionItem.findMany({
      where: { transactionId },
      include: {
        product: true,
        transaction: {
          include: {
            user: true,
          },
        },
        booking: true,
      },
    });
  }

  findByProductId(productId: number) {
    return this.prisma.transactionItem.findMany({
      where: { productId },
      include: {
        product: true,
        transaction: true,
        booking: true,
      },
    });
  }

  update(id: number, data: UpdateTransactionItemDto) {
    return this.prisma.transactionItem.update({
      where: { id },
      data,
      include: {
        product: true,
        transaction: true,
        booking: true,
      },
    });
  }

  delete(id: number) {
    return this.prisma.transactionItem.delete({
      where: { id },
    });
  }
}