import { ProductService } from '../product/product.service';
import { Controller , Get, Param, Post, Body, UseGuards, Patch, Delete} from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
// import { Roles } from '../auth/guards/roles.guard';
import { Role } from 'src/auth/decorators/roles.decorator';


@Controller('products')
// @UseGuards(JwtAuthGuard)

export class ProductController {
    constructor(private readonly productService:ProductService){}


    @Get()
    getAllProducts(){
        return this.productService.getAllProducts();
    }

    @UseGuards(JwtAuthGuard )
    @Get(':id')
    getProduct(@Param('id') id:string){
        return this.productService.getProductById(Number(id));
    }
    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Patch(':id')
    updateProduct(@Param('id') id:string, @Body() data: UpdateProductDto){
        return this.productService.update(Number(id), data);
    }
    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
        @Roles(Role.ADMIN)
    @Delete(':id')
    deleteProduct(@Param('id') id:string){
        return this.productService.delete(Number(id));
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
            @Roles(Role.ADMIN)
    @Post('createproduct')
    createProduct(
        @Body() body:{
            // id:number,
            title:string,
            price:number,
            description:string,
            image:string,
            stock:number,

        },
    ){
        return this.productService.createProduct(body);
    }

}