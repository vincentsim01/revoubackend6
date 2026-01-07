import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryRepository } from './category.repository';

@Module({
  providers: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
  imports: [PrismaModule],
  exports: [CategoryService, PrismaModule],
})
export class CategoryModule {}
