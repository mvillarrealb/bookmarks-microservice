import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryAdapter } from './category.adapter';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category as CategoryEntity } from '../entities/category.entity';
import {repositoryMockFactory } from '../../test/test.util';

describe('CategoryService', () => {
  let service: CategoryService;
  let repositoryMock;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getRepositoryToken(CategoryEntity), useFactory: repositoryMockFactory },
        CategoryAdapter,
        CategoryService,
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repositoryMock = module.get(getRepositoryToken(CategoryEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
