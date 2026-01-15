// import { BatchPayload } from './../../node_modules/.prisma/client/index.d';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(private readonly productRepo: ProductRepository, private readonly prisma: PrismaService){}

    getAllProducts(){
        return this.productRepo.findAll();
    }

      /**
   * Fetch all products by category
   * @param categoryName
   */
    async getProductsByCategory(categoryName: string) {
        return this.productRepo.findAllByCategory(categoryName);
    }

    getProductById(id:number){
        const product =  this.productRepo.findOne(id);
        if(!product) throw new NotFoundException('product not found');
        return product;
    }

    findByEmail(email:string){
        const product =  this.productRepo.findByEmail(email);
        if(!product) throw new NotFoundException('product not found');
        return product;
    }

    update(id: number, data: UpdateProductDto) {
    return this.productRepo.update(id, data);
    //   where: { id },
    //   data,
    };

    delete(id: number) {
    return this.productRepo.delete(id);
    //   where: { id },
    //   data,
    };
  

    createProduct(
        data:{
            // id:number,
            title: string,
            price: number,
            description: string,
            image: string,
            stock: number,

        }
    ){
        return this.productRepo.createProduct(data);
    }
}