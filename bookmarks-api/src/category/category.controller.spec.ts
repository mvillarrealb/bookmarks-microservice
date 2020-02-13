import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryAdapter } from './category.adapter';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category as CategoryEntity } from '../entities/category.entity';
import {repositoryMockFactory } from '../../test/test.util';

describe('Category Controller', () => {
  let controller: CategoryController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
