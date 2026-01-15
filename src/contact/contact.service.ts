import { Injectable } from '@nestjs/common';
import { ContactRepository } from './contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepo: ContactRepository) {}

  async create(createContactDto: CreateContactDto) {
    return this.contactRepo.create(createContactDto);
  }

  async findAll() {
    return this.contactRepo.findAll();
  }

  async findOne(id: number) {
    return this.contactRepo.findOne(id);
  }
}
