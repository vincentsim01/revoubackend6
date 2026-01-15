import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { AccountModule } from './account/account.module';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BookingSessionModule } from './bookingsession/bookingsession.module';
import { PackageModule } from './package/package.module';
import { CategoryModule } from './category/category.module';
import { TransactionItemModule } from './transaction-item/transaction-item.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { ContactModule } from './contact/contact.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule, TransactionModule, AccountModule, ProductModule, PrismaModule, AuthModule, PaymentModule, CartModule, TransactionItemModule, CategoryModule, PackageModule, BookingSessionModule, ContactModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
