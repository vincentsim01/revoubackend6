import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import {AuthController} from '../auth/auth.controller';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import {UpdateTransactionItemDto} from './dto/update-transaction.dto';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(data: { quantity: number; userId: number; total: number; items: any[] }) {


    // await this.authController.loginUser({email: data.email, password: data.password});

    return this.prisma.transaction.create({
      data: {
        userId: data.userId,
        total: data.total,
        items: data.items[],
      },
    });
  }

  findAll() {
    return this.prisma.transaction.findMany({
    //   include: { todos: true },
    });
  }

  findOne(id: number) {
    return this.prisma.transaction.findUnique({
      where: { id },
    //   include: { todos: true },
    });
  }

  update(id: number, data: UpdateTransactionItemDto) {
    return this.prisma.transaction.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.transaction.delete({
      where: { id },
    });
  }



}