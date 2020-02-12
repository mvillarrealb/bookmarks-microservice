import { ICategoryPort } from '../src/ports';
import { Category } from '../src/domain';

export class CategoryAdapter implements ICategoryPort {
    findCategory(categoryId: string): Promise<Category> {
        throw new Error('Method not implemented.');
    }
    createCategory(category: Category): Promise<Category> {
        throw new Error('Method not implemented.');
    }
    updateCategory(categoryId: string, category: Partial<Category>): Promise<Category> {
        throw new Error('Method not implemented.');
    }
    deleteCategory(categoryId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
