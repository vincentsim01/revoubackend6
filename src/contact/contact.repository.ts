import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateContactDto) {
    const contact = await this.prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        mobile: BigInt(data.mobile),
        message: data.message,
      },
    });
    
    return {
      ...contact,
      mobile: contact.mobile.toString(),
    };
  }

  async findAll() {
    const contacts = await this.prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return contacts.map(contact => ({
      ...contact,
      mobile: contact.mobile.toString(),
    }));
  }

  async findOne(id: number) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });
    
    if (!contact) return null;
    
    return {
      ...contact,
      mobile: contact.mobile.toString(),
    };
  }
}
