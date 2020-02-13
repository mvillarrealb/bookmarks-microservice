import { Test, TestingModule } from '@nestjs/testing';
import { CategoryAdapter } from './category.adapter';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category as CategoryEntity } from '../entities/category.entity';
import {repositoryMockFactory } from '../../test/test.util';
describe('CategoryAdapter', () => {
  let provider: CategoryAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getRepositoryToken(CategoryEntity), useFactory: repositoryMockFactory },
        CategoryAdapter,
      ],
    }).compile();

    provider = module.get<CategoryAdapter>(CategoryAdapter);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
