import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkAdapter } from './bookmark.adapter';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookMark as BookMark } from '../entities/bookmark.entity';
import {repositoryMockFactory } from '../../test/test.util';
describe('BookmarkAdapter', () => {
  let provider: BookmarkAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getRepositoryToken(BookMark), useFactory: repositoryMockFactory },
        BookmarkAdapter,
      ],
    }).compile();

    provider = module.get<BookmarkAdapter>(BookmarkAdapter);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
