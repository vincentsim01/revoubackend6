import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [PackageService],
  controllers: [PackageController],
  imports: [PrismaModule],
  exports: [PackageService, PrismaModule],
})
export class PackageModule {}
