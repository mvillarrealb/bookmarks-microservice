import { Module, DynamicModule } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryAdapter } from './category.adapter';
import { CategoryController } from './category.controller';
import { Category } from '../entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class CategoryModule {
  static register(): DynamicModule {
    return {
      module: CategoryModule,
      imports: [
        TypeOrmModule.forFeature([ Category ]),
      ],
      providers: [CategoryService, CategoryAdapter],
      controllers: [CategoryController],
      exports: [CategoryAdapter],
    };
  }
}
