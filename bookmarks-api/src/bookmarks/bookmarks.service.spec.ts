import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookmarksService } from './bookmarks.service';
import { BookmarkAdapter } from './bookmark.adapter';
import { ScraperAdapter } from '../scraper/scraper.adapter';
import { ScraperService } from '../scraper/scraper.service';
import { BookMark as BookMark } from '../entities/bookmark.entity';
import {repositoryMockFactory } from '../../test/test.util';

describe('BookmarksService', () => {
  let service: BookmarksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          timeout: 1000,
          maxRedirects: 1,
        }),
      ],
      providers: [
        { provide: getRepositoryToken(BookMark), useFactory: repositoryMockFactory },
        ScraperAdapter,
        ScraperService,
        BookmarkAdapter,
        BookmarksService,
      ],
    }).compile();

    service = module.get<BookmarksService>(BookmarksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
