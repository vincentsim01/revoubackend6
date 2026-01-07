// import { BatchPayload } from './../../node_modules/.prisma/client/index.d';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepo: CategoryRepository, private readonly prisma: PrismaService){}

    getAllCategories(){
        return this.categoryRepo.findAll();
    }

    getCategoryById(id:number){
        const category =  this.categoryRepo.findOne(id);
        if(!category) throw new NotFoundException('category not found');
        return category;
    }



    update(id: number, data: UpdateCategoryDto) {
    return this.categoryRepo.update(id, data);
    //   where: { id },
    //   data,
    };

    delete(id: number) {
    return this.categoryRepo.delete(id);
    //   where: { id },
    //   data,
    };
  

    createCategory(
        data:{
            // id:number,
            name: string,
            description: string,
            productId: number,
            image: string,

        }
    ){
        return this.categoryRepo.createCategory(data);
    }
}