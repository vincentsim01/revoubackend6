import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import {AuthController} from '../auth/auth.controller';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import {UpdateProductDto} from './dto/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(data: { title: string; price: number; description: string; image: string; stock: number }) {
    return this.prisma.product.create({
      data: {
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.image,
        stock: data.stock,
      },
    });
  }


    /**
   * Get all products for a specific category name
   * @param categoryName - e.g. "Traditional"
   */
  async findAllByCategory(categoryName: string) {
    console.log("categoryName is "+categoryName)
    return this.prisma.product.findMany({
      where: {
        categories: {
          some: {
            category: {
              name: {
                equals: categoryName,
                mode: 'insensitive', // case-insensitive search
              },
            },
          },
        },
      },
      include: {
        categories: {
          include: {
            category: true, // include full category info
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  

  update(id: number, data: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
    // await this.authController.loginUser({email: data.email, password: data.password});









  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}