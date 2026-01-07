import { PaymentService } from './payment.service';
import { Controller , Get, Param, Post, Body, UseGuards, Patch, Delete} from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
// import { Roles } from '../auth/guards/roles.guard';
import { Role } from 'src/auth/decorators/roles.decorator';


@Controller('payment')
// @UseGuards(JwtAuthGuard)

export class PaymentController {
    constructor(private readonly paymentService:PaymentService){}

    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Get()
    getAllPayments(){
        return this.paymentService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Get(':id')
    getPayment(@Param('id') id:string){
        return this.paymentService.findOne(Number(id));
    }
    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Patch(':id')
    updatePayment(@Param('id') id:string, @Body() data: UpdatePaymentDto){
        return this.paymentService.update(Number(id), data);
    }
    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    deletePayment(@Param('id') id:string){
        return this.paymentService.remove(Number(id));
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    createPayment(
        @Body() body:{
            transactionId:number,
            provider:string,
            status:string,
            amount:number,
            paidAt: string,
        },
    ){
        return this.paymentService.create(body);
    }

}