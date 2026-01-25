import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import {AuthController} from '../auth/auth.controller';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import {UpdateCategoryDto} from './dto/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(data: { name: string; description: string; productId?: number; image: string;  }) {


    // await this.authController.loginUser({email: data.email, password: data.password});

    return this.prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
        ...(data.productId && {
          products: {
            create: {
              productId: data.productId,
            },
          },
        }),
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany({
    //   include: { todos: true },
    });
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
    //   include: { todos: true },
    });
  }

  update(id: number, data: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }



}