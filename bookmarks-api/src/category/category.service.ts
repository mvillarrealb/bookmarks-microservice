import { Injectable } from '@nestjs/common';
import { CategoryUseCase } from 'bookmarks-domain/src/use_cases';
import { CategoryAdapter } from './category.adapter';

@Injectable()
export class CategoryService extends CategoryUseCase {
    constructor(
        private readonly adapter: CategoryAdapter,
    ) {
        super(adapter);
    }
    findAll() {
        return this.adapter.findAll();
    }
}
