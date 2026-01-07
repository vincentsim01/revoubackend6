import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import {AuthController} from '../auth/auth.controller';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import {UpdatePackageDto} from './dto/update-package.dto';

@Injectable()
export class PackageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPackage(data: { name: string; description: string; price: number; durationMin: number; }) {


    // await this.authController.loginUser({email: data.email, password: data.password});

    return this.prisma.package.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        durationMin: data.durationMin,
      },
    });
  }

  findAll() {
    return this.prisma.package.findMany({
    //   include: { todos: true },
    });
  }

  findOne(id: number) {
    return this.prisma.package.findUnique({
      where: { id },
    //   include: { todos: true },
    });
  }

  update(id: number, data: UpdatePackageDto) {
    return this.prisma.package.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.package.delete({
      where: { id },
    });
  }



}