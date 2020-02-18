import { Controller, Get, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ThrowOn } from 'bookmarks-domain/src/domain/throw.enum';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly service: CategoryService,
    ){}
    @Get()
    findAll() {
        return this.service.findAll();
    }
    @Get()
    findOne(categoryId: string) {
        return this.service.validateCategory(categoryId, ThrowOn.NOT_FOUND);
    }
    @Post()
    create() {
       return this.service.createCategory();
    }
    @Put()
    update() {}
}
