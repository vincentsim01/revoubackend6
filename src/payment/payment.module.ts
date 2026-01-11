import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [PaymentController],
  imports: [PrismaModule],
  providers: [PaymentService, PaymentRepository],
  exports: [PaymentService, PrismaModule],
})
export class PaymentModule {}
