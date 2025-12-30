// import { BatchPayload } from './../../node_modules/.prisma/client/index.d';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTransactionItemDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
    constructor(private readonly transactionRepo: TransactionRepository, private readonly prisma: PrismaService){}

    getAllTransactions(){
        return this.transactionRepo.findAll();
    }

    getTransactionById(id:number){
        const transaction =  this.transactionRepo.findOne(id);
        if(!transaction) throw new NotFoundException('transaction not found');
        return transaction;
    }


    update(id: number, data: UpdateTransactionItemDto) {
    return this.transactionRepo.update(id, data);
    //   where: { id },
    //   data,
    };

    delete(id: number) {
    return this.transactionRepo.delete(id);
    //   where: { id },
    //   data,
    };
  

    createTransaction(
        data:{
            userId:number,
            total: number,
            items: any[],

        }
    ){
        return this.transactionRepo.createTransaction(data);
    }
}