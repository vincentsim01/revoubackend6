import { Module } from '@nestjs/common';
import { BookingSessionService } from './bookingsession.service';
import { BookingSessionController } from './bookingsession.controller';
import { BookingSessionRepository } from './bookingsession.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [BookingSessionService, PrismaService, BookingSessionRepository],
  controllers: [BookingSessionController]
})
export class BookingSessionModule {}
