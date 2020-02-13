import { Test, TestingModule } from '@nestjs/testing';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksService } from './bookmarks.service';
import { BookmarkAdapter } from './bookmark.adapter';
import { ScraperService } from '../scraper/scraper.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookMark as BookMark } from '../entities/bookmark.entity';
import {repositoryMockFactory } from '../../test/test.util';
import { ScraperAdapter } from '../scraper/scraper.adapter';
import { HttpModule } from '@nestjs/common';

describe('Bookmarks Controller', () => {
  let controller: BookmarksController;

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
        BookmarksService,
      ],
      controllers: [BookmarksController],
    }).compile();

    controller = module.get<BookmarksController>(BookmarksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
