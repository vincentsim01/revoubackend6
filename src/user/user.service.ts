// import { BatchPayload } from './../../node_modules/.prisma/client/index.d';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository, private readonly prisma: PrismaService){}

    getAllClients(){
        return this.userRepo.findAll();
    }

    getClientById(id:number){
        const client =  this.userRepo.findOne(id);
        if(!client) throw new NotFoundException('client not found');
        return client;
    }

    findByEmail(email:string){
        const client =  this.userRepo.findByEmail(email);
        if(!client) throw new NotFoundException('client not found');
        return client;
    }

    update(id: number, data: UpdateUserDto) {
    return this.userRepo.update(id, data);
    //   where: { id },
    //   data,
    };

    delete(id: number) {
    return this.userRepo.delete(id);
    //   where: { id },
    //   data,
    };
  

    createClient(
        data:{
            // id:number,
            name: string,
            email: string,
            password: string,
            role: 'ADMIN' | 'USER',

        }
    ){
        return this.userRepo.createUser(data);
    }
}
