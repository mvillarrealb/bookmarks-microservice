import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryAdapter } from './category.adapter';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category as CategoryEntity } from '../entities/category.entity';
import {repositoryMockFactory } from '../../test/test.util';

describe('CategoryService', () => {
  let service: CategoryService;
  let adapter: CategoryAdapter;
  const cat = new CategoryEntity({
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
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    adapter = module.get<CategoryAdapter>(CategoryAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Should find categories', async () => {
    jest.spyOn(adapter, 'findAll').mockImplementationOnce(async () => [cat, cat]);
    const list = await service.findAll();
    expect(list).toHaveLength(2);
  });
});
