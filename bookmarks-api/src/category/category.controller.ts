import { Controller, Get, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly service: CategoryService,
    ){}
    @Get()
    findAll() {}
    @Get()
    findOne(categoryId: string) {}
    @Post()
    create() {}
    @Put()
    update() {}
}
