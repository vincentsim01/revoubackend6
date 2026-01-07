import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import {AuthController} from '../auth/auth.controller';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import {UpdateBookingSessionDto} from './dto/update-bookingsession.dto';

@Injectable()
export class BookingSessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createBookingSession(data: { bookingDate: string; notes: string; status: string; userId: number; packageId: number; transactionitemId: number; transactionId: number; }) {


    // await this.authController.loginUser({email: data.email, password: data.password});

    return this.prisma.bookingSession.create({
      data: {
        bookingDate: data.bookingDate,
        notes: data.notes,
        status: data.status,
        userId: data.userId,
        packageId: data.packageId,
        transactionitemId: data.transactionitemId,
        transactionId: data.transactionId,
      },
    });
  }

  findAll() {
    return this.prisma.bookingSession.findMany({
    //   include: { todos: true },
    });
  }

  findOne(id: number) {
    return this.prisma.bookingSession.findUnique({
      where: { id },
    //   include: { todos: true },
    });
  }

  update(id: number, data: UpdateBookingSessionDto) {
    return this.prisma.bookingSession.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.bookingSession.delete({
      where: { id },
    });
  }


findByEmail(email: string) {
  return this.prisma.bookingSession.findMany({
    where: {
      user: {
        email: email,
      },
    },
    include: {
      user: true,
      package: true,
      transaction: true,
      transactionItem: true,
    },
  });
}
}