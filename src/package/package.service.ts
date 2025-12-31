// import { BatchPayload } from './../../node_modules/.prisma/client/index.d';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PackageRepository } from './package.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePackageDto } from './dto/update-package.dto';

@Injectable()
export class PackageService {
    constructor(private readonly packageRepo: PackageRepository, private readonly prisma: PrismaService){}

    getAllPackages(){
        return this.packageRepo.findAll();
    }

    getPackageById(id:number){
        const packages =  this.packageRepo.findOne(id);
        if(!packages) throw new NotFoundException('package not found');
        return packages;
    }

    update(id: number, data: UpdatePackageDto) {
    return this.packageRepo.update(id, data);
    //   where: { id },
    //   data,
    };

    delete(id: number) {
    return this.packageRepo.delete(id);
    //   where: { id },
    //   data,
    };
  

    createPackage(
        data:{
            // id:number,
            name: string,
            description: string,
            price: number,
            durationMin: number,

        }
    ){
        return this.packageRepo.createPackage(data);
    }
}