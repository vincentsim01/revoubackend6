import { CategoryService } from './category.service';
import { Controller , Get, Param, Post, Body, UseGuards, Patch, Delete} from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
// import { Roles } from '../auth/guards/roles.guard';
import { Role } from 'src/auth/decorators/roles.decorator';


@Controller('category')
// @UseGuards(JwtAuthGuard)

export class CategoryController {
    constructor(private readonly categoryService:CategoryService){}

    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Get()
    getAllCategories(){
        return this.categoryService.getAllCategories();
    }

    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Get(':id')
    getCategory(@Param('id') id:string){
        return this.categoryService.getCategoryById(Number(id));
    }
    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Patch(':id')
    updateCategory(@Param('id') id:string, @Body() data: UpdateCategoryDto){
        return this.categoryService.update(Number(id), data);
    }
    @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    deleteCategory(@Param('id') id:string){
        return this.categoryService.delete(Number(id));
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    createCategory(
        @Body() body:{
            name:string,
            description:string,
            productId:number,
            image: string
        },
    ){
        return this.categoryService.createCategory(body);
    }

}