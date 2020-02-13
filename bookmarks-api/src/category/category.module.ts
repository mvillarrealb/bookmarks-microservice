import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryAdapter } from './category.adapter';
import { CategoryController } from './category.controller';

@Module({
  providers: [CategoryService, CategoryAdapter],
  controllers: [CategoryController],
})
export class CategoryModule {}
