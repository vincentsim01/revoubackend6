import { BookingSessionService } from './bookingsession.service';
import { Controller , Get, Param, Post, Body, UseGuards, Patch, Delete} from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateBookingSessionDto } from './dto/update-bookingsession.dto';
import { CreateBookingSessionDto } from './dto/create-bookingsession.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
// import { Roles } from '../auth/guards/roles.guard';
import { Role } from 'src/auth/decorators/roles.decorator';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';


@Controller('booking')
// @UseGuards(JwtAuthGuard)

export class BookingSessionController {
    constructor(private readonly bookingSessionService:BookingSessionService){}

    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Get()
    getAllBookingSessions(){
        return this.bookingSessionService.getAllBookingSessions();
    }

    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Get(':id')
    getBooking(@Param('id') id:string){
        return this.bookingSessionService.getBookingSessionById(Number(id));
    }
    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Patch(':id')
    updateBooking(@Param('id') id:string, @Body() data: UpdateBookingSessionDto){
        return this.bookingSessionService.update(Number(id), data);
    }
    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    deleteBooking(@Param('id') id:string){
        return this.bookingSessionService.delete(Number(id));
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    createBooking(
        @Body() body: CreateBookingSessionDto,
    ){
        return this.bookingSessionService.createBooking(body);
    }

}