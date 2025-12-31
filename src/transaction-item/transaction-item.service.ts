// import { BatchPayload } from './../../node_modules/.prisma/client/index.d';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionItemRepository } from './transaction-item.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTransactionItemDto } from './dto/update-transaction-item.dto/update-transaction-item.dto';

@Injectable()
export class TransactionItemService {
    constructor(private readonly transactionItemRepo: TransactionItemRepository, private readonly prisma: PrismaService){}

    getAllTransactionItems(){
        return this.transactionItemRepo.findAll();
    }

    getTransactionItemById(id:number){
        const transactionItem =  this.transactionItemRepo.findOne(id);
        if(!transactionItem) throw new NotFoundException('transaction item not found');
        return transactionItem;
    }

    findByEmail(email:string){
        const client =  this.transactionItemRepo.findByEmail(email);
        if(!client) throw new NotFoundException('client not found');
        return client;
    }

    update(id: number, data: UpdateTransactionItemDto) {
    return this.transactionItemRepo.update(id, data);
    //   where: { id },
    //   data,
    };

    delete(id: number) {
    return this.transactionItemRepo.delete(id);
    //   where: { id },
    //   data,
    };
  

    createTransactionItem(
        data:{
            // id:number,
            transactionId: number,
            productId: number,
            quantity: number,
            price: number,
  

        }
    ){
        return this.transactionItemRepo.createTransactionItem(data);
    }
}