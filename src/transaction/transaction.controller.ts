import { TransactionService } from './transaction.service';
import { Controller , Get, Param, Post, Body, UseGuards, Patch, Delete} from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateTransactionItemDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
// import { Roles } from '../auth/guards/roles.guard';
import { Role } from 'src/auth/decorators/roles.decorator';


@Controller('transactions')
// @UseGuards(JwtAuthGuard)

export class TransactionController {
    constructor(private readonly transactionService:TransactionService){}

    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Get()
    getAllTransactions(){
        return this.transactionService.getAllTransactions();
    }

    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Get(':id')
    getTransaction(@Param('id') id:string){
        return this.transactionService.getTransactionById(Number(id));
    }
    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Patch(':id')
    updateTransaction(@Param('id') id:string, @Body() data: UpdateTransactionItemDto){
        return this.transactionService.update(Number(id), data);
    }
    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    deleteTransaction(@Param('id') id:string){
        return this.transactionService.delete(Number(id));
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    createTransaction(
        @Body() body:{
            userId:number,
            total:number,
            items:any[],
        },
    ){
        return this.transactionService.createTransaction(body);
    }

}