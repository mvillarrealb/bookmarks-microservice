import { Injectable } from '@nestjs/common';
import { ICategoryPort } from 'bookmarks-domain/src/ports';
import { Category } from 'bookmarks-domain/src/domain';
import { Category as CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryAdapter implements ICategoryPort {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly repository: Repository<CategoryEntity>,
    ) {}
    findCategory(categoryId: string): Promise<Category> {
        return this.repository.findOne(categoryId);
    }
    createCategory(category: Category): Promise<Category> {
        return this.repository.save(category);
    }
    async updateCategory(categoryId: string, category: Partial<Category>): Promise<Category> {
        const updated = await this.repository.update(categoryId, category);
        return this.findCategory(categoryId);
    }
    async deleteCategory(categoryId: string): Promise<void> {
        const response = await this.repository.delete(categoryId);
    }
}
