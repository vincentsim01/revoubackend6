import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import {AuthController} from '../auth/auth.controller';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import {UpdateTransactionItemDto} from './dto/update-transaction-item.dto/update-transaction-item.dto';

@Injectable()
export class TransactionItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTransactionItem(data: { transactionId: number; productId: number; quantity: number; price: number; }) {
    return this.prisma.transactionItem.create({
      data: {
        transactionId: data.transactionId,
        productId: data.productId,
        quantity: data.quantity,
        price: data.price,
      },
    });
  }


  

  findAll() {
    return this.prisma.transactionItem.findMany({
    //   include: { todos: true },
    });
  }

  findOne(id: number) {
    return this.prisma.transactionItem.findUnique({
      where: { id },
    //   include: { todos: true },
    });
  }

  update(id: number, data: UpdateTransactionItemDto) {
    return this.prisma.transactionItem.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }


findByEmail(email: string) {
  return this.prisma.transactionItem.findMany({
    where: {
      transaction: {
        user: {
          email: email,
        },
      },
    },
    include: {
      product: true,
      transaction: true,
    },
  });
}
}