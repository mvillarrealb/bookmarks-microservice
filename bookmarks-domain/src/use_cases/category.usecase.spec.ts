import { CategoryUseCase } from './category.usecase';
import { ICategoryPort } from '../ports';
import { CategoryAdapter } from '../../test/category.adapter.fixture';
import { Category } from '../domain';
import { ThrowOn } from '../domain/throw.enum';
import { AlreadyExistsError, NotFoundError } from '../errors';
import { md5 } from '../util/util';

describe('Category usecase', () => {
    let usecase: CategoryUseCase;
    let port: ICategoryPort;
    const category = new Category({
        categoryId: md5('Microservices'),
        title: 'Microservices',
        description: 'Everything related to microservices :)',
    });
    beforeAll(() => {
        port = new CategoryAdapter();
        usecase = new CategoryUseCase(port);
    });
    it('Should create category', async () => {
        jest.spyOn(port, 'findCategory')
        .mockImplementationOnce(async (c: string) => undefined);
        jest.spyOn(port, 'createCategory')
        .mockImplementationOnce(async (c: Category) => c);
        const { title, description } = category;
        const created = await usecase.createCategory(title, description);
        expect(created).toHaveProperty('categoryId');
        expect(created).toHaveProperty('title', title);
        expect(created).toHaveProperty('description', description);
        expect(created).toHaveProperty('createdAt');
    });
    it('Should update category', async () => {
        const title = 'Updated';
        const description = 'I have been updated';
        jest.spyOn(port, 'findCategory')
        .mockImplementationOnce(async (id: string) => category);
        jest.spyOn(port, 'updateCategory')
        .mockImplementationOnce(async (id: string, cat: Partial<Category>) => {
            Object.assign(category, cat);
            return category;
        });
        const result = await usecase.updateCategory(':id', title, description);
        expect(result).toHaveProperty('categoryId');
        expect(result).toHaveProperty('title', title);
        expect(result).toHaveProperty('description',  description);
        expect(result).toHaveProperty('updatedAt');
    });
    it('Should delete category', async () => {
        jest.spyOn(port, 'findCategory')
        .mockImplementationOnce(async (id: string) => category);
        jest.spyOn(port, 'deleteCategory')
        .mockImplementationOnce(async (id: string) => { let a = id; });
        await usecase.deleteCategory(':id');
    });
    it('Should throw exceptions', async () => {
        jest.spyOn(port, 'findCategory')
       .mockImplementationOnce(async (id: string) => category);
        await expect(usecase.validateCategory('id', ThrowOn.FOUND)).rejects.toThrow(AlreadyExistsError);

        jest.spyOn(port, 'findCategory')
        .mockImplementationOnce(async (id: string) => undefined);
        await expect(usecase.validateCategory('id', ThrowOn.NOT_FOUND)).rejects.toThrow(NotFoundError);
    });
});
