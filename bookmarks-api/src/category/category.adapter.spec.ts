import { Test, TestingModule } from '@nestjs/testing';
import { CategoryAdapter } from './category.adapter';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category as CategoryEntity } from '../entities/category.entity';
import {repositoryMockFactory, MockType } from '../../test/test.util';
import { Category } from 'bookmarks-domain/src/domain';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
describe('CategoryAdapter', () => {
  let provider: CategoryAdapter;
  let repository: MockType<Repository<Category>>;
  const repoToken = getRepositoryToken(CategoryEntity);
  const category = new CategoryEntity({
    categoryId: 'categoryId',
    title: 'Database',
    description: 'Database related topics',
    createdAt: new Date(),
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: repoToken, useFactory: repositoryMockFactory },
        CategoryAdapter,
      ],
    }).compile();
    repository = module.get(repoToken);
    provider = module.get<CategoryAdapter>(CategoryAdapter);

  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('Should create categories', async () => {
    repository.save.mockReturnValue(category);
    const created = await provider.createCategory(category);
    expect(created).toHaveProperty('categoryId');
    expect(created).toHaveProperty('createdAt');
    expect(created).toHaveProperty('title', created.title);
    expect(created).toHaveProperty('description', created.description);
  });

  it('Should update a category', async () => {
    const updateData = new Category({
      categoryId: 'categoryId',
      title: 'Database updated',
      description: 'Updated topic',
    });
    const result: UpdateResult = {
      raw: updateData,
      affected: 1,
      generatedMaps: null,
    };
    repository.findOne.mockReturnValue(updateData);
    repository.update.mockReturnValue(result);
    const updated = await provider.updateCategory('cat-id', updateData);
    expect(updated).toHaveProperty('title', updated.title);
    expect(updated).toHaveProperty('description', updated.description);
  });
  it('Should list categories', async () => {
    repository.find.mockReturnValue([category, category]);
    const list = await provider.findAll();
    expect(list).toHaveLength(2);
  });
  it('Should find a category', async () => {
    repository.findOne.mockReturnValue(category);
    const found = await provider.findCategory('category-id');
    expect(found).toHaveProperty('categoryId');
    expect(found).toHaveProperty('createdAt');
    expect(found).toHaveProperty('title', category.title);
    expect(found).toHaveProperty('description', category.description);
  });
  it('Should delete categories', async () => {
    const result: DeleteResult = {
      raw: category,
      affected: 1,
    };
    repository.delete.mockReturnValueOnce(result);
    await expect(provider.deleteCategory('category')).resolves.not.toThrow();
  });
});
