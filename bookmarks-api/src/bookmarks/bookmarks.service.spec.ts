import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { BookmarksService } from './bookmarks.service';
import { BookmarkAdapter } from './bookmark.adapter';
import { ScraperAdapter } from '../scraper/scraper.adapter';
import { ScraperService } from '../scraper/scraper.service';
import { BookMark as BookMark } from '../entities/bookmark.entity';
import {repositoryMockFactory, MockType } from '../../test/test.util';
import { ScrapedDocument, Category } from 'bookmarks-domain/src/domain';
import { Repository } from 'typeorm';
import { Category as CategoryEntity } from '../entities/category.entity';
import { CategoryAdapter } from '../category/category.adapter';
import { CategoryModule } from '../category/category.module';
import { ScraperModule } from '../scraper/scraper.module';

describe('BookmarksService', () => {
  let service: BookmarksService;
  let adapter: BookmarkAdapter;
  let categoryAdapter: CategoryAdapter;
  let repository: MockType<Repository<BookMark>>;
  const title = 'Creating a bookmark manager with typescript';
  const url = 'https://github.com/mvillarrealb';
  const category = new CategoryEntity({
    categoryId: 'categoryId',
    title: 'Database',
    description: 'Database related topics',
    createdAt: new Date(),
  });
  const bookmark = new BookMark({
    bookmarkId: 'bm-id',
    title,
    url,
    tags: new Map([['k', 'v']]),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const document = new ScrapedDocument({ url, title });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.db',
          logging: false,
          synchronize: true,
          entities: [ __dirname + '../**/*.entity{.ts,.js}'],
        }),
        CategoryModule.register(),
        HttpModule.register({
          timeout: 1000,
          maxRedirects: 1,
        }),
        ScraperModule,
      ],
      providers: [
        { provide: getRepositoryToken(BookMark), useFactory: repositoryMockFactory },
        BookmarkAdapter,
        BookmarksService,
      ],
    }).compile();
    repository = module.get(getRepositoryToken(BookMark));
    categoryAdapter = module.get<CategoryAdapter>(CategoryAdapter);
    adapter = module.get<BookmarkAdapter>(BookmarkAdapter);
    service = module.get<BookmarksService>(BookmarksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Should create bookmark', async () => {
    jest.spyOn(categoryAdapter, 'findCategory')
    .mockImplementationOnce(async (id) => category);
    repository.save.mockImplementationOnce(async (a) => a);
    const response = await service.createBookMark('categoryId', document);
    expect(response).toHaveProperty('bookmarkId');
    expect(response).toHaveProperty('title', bookmark.title);
    expect(response).toHaveProperty('url', bookmark.url);
    expect(response).toHaveProperty('tags');
  });

  it('Should fetch bookmark', async () => {
    jest.spyOn(adapter, 'findAll')
    .mockImplementationOnce(async () => [bookmark, bookmark]);
    const response = await service.findAll();
    expect(response).toHaveLength(2);
  });
});
