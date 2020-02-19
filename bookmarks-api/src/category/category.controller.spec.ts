import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryAdapter } from './category.adapter';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category as CategoryEntity } from '../entities/category.entity';
import {repositoryMockFactory } from '../../test/test.util';

describe('Category Controller', () => {
  let controller: CategoryController;
  let service: CategoryService;
  const category = new CategoryEntity({
    categoryId: 'categoryId',
    title: 'Database',
    description: 'Database related topics',
    createdAt: new Date(),
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getRepositoryToken(CategoryEntity), useFactory: repositoryMockFactory },
        CategoryAdapter,
        CategoryService,
      ],
      controllers: [CategoryController],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service    = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('Should create category', async () => {
    jest.spyOn(service, 'createCategory')
    .mockImplementationOnce(async (c) => category);
    const { title, description }  = category;
    const partial = { title, description };
    const created = await controller.create(partial);
    expect(created).toHaveProperty('categoryId');
    expect(created).toHaveProperty('createdAt');
    expect(created).toHaveProperty('title', partial.title);
    expect(created).toHaveProperty('description', partial.description);
  });
  it('Should update a category', async () => {
    const partial = {
      title: 'updated',
      description: 'update',
    };
    const merged = Object.assign(category, partial);
    jest.spyOn(service, 'updateCategory')
    .mockImplementationOnce(async (c) => merged);
    const updated = await controller.update('cat-id', partial);
    expect(updated).toHaveProperty('title', updated.title);
    expect(updated).toHaveProperty('description', updated.description);
    expect(updated).toHaveProperty('createdAt');
  });
  it('Should find all categories', async () => {
    jest.spyOn(service, 'findAll')
    .mockImplementationOnce(async () => [category, category]);
    const list = await controller.findAll();
    expect(list).toHaveLength(2);
  });
  it('Should find single category', async () => {
    jest.spyOn(service, 'validateCategory')
    .mockImplementationOnce(async () => category);
    const found = await controller.findOne('category-id');
    expect(found).toHaveProperty('categoryId');
    expect(found).toHaveProperty('createdAt');
    expect(found).toHaveProperty('title', category.title);
    expect(found).toHaveProperty('description', category.description);
  });

  it('Should delete category', async () =>  {
    await expect(controller.delete('category')).resolves.not.toThrow();
  });
});
