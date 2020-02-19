import { Controller, Get, Post, Put, Delete, HttpCode, Param, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ThrowOn } from 'bookmarks-domain/src/domain/throw.enum';
import { Category } from 'bookmarks-domain/src/domain';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly service: CategoryService,
    ) {}
    @Get()
    findAll() {
        return this.service.findAll();
    }
    @Get(':categoryId')
    findOne(@Param('categoryId') categoryId: string) {
        return this.service.validateCategory(categoryId, ThrowOn.NOT_FOUND);
    }
    @Post()
    @HttpCode(201)
    create(@Body() category: Partial<Category>) {
        const { title, description } = category;
        return this.service.createCategory(title, description);
    }
    @Put(':categoryId')
    update(@Param('categoryId') categoryId: string, @Body() data: Partial<Category>) {
        const { title, description } = data;
        return this.service.updateCategory(categoryId, title, description);
    }
    @Delete(':categoryId')
    @HttpCode(202)
    delete(categoryId: string) {
        return this.service.deleteCategory(categoryId);
    }
}
