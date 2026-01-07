// import { BatchPayload } from './../../node_modules/.prisma/client/index.d';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingSessionRepository } from './bookingsession.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateBookingSessionDto } from './dto/update-bookingsession.dto';

@Injectable()
export class BookingSessionService {
    constructor(private readonly bookingSessionRepo: BookingSessionRepository, private readonly prisma: PrismaService){}

    getAllBookingSessions(){
        return this.bookingSessionRepo.findAll();
    }

    getBookingSessionById(id:number){
        const bookingSession =  this.bookingSessionRepo.findOne(id);
        if(!bookingSession) throw new NotFoundException('bookingSession not found');
        return bookingSession;
    }

    findByEmail(email:string){
        const bookingSession =  this.bookingSessionRepo.findByEmail(email);
        if(!bookingSession) throw new NotFoundException('bookingSession not found');
        return bookingSession;
    }

    update(id: number, data: UpdateBookingSessionDto) {
    return this.bookingSessionRepo.update(id, data);
    };

    delete(id: number) {
    return this.bookingSessionRepo.delete(id);
    //   where: { id },
    //   data,
    };
  

    createBooking(
        data:{
            // id:number,
            bookingDate: string,
            notes: string,
            status: string,
            userId: number,
            packageId: number,
            transactionitemId: number,
            transactionId: number,

        }
    ){
        return this.bookingSessionRepo.createBookingSession(data);
    }
}