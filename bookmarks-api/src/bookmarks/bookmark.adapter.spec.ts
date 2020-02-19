import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkAdapter } from './bookmark.adapter';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookMark as BookMark } from '../entities/bookmark.entity';
import {repositoryMockFactory, MockType } from '../../test/test.util';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
describe('BookmarkAdapter', () => {
  let provider: BookmarkAdapter;
  let repository: MockType<Repository<BookMark>>;
  const bookmark = new BookMark({
    bookmarkId: 'bm-id',
    title: 'Creating a bookmark manager with typescript',
    url: 'https://github.com/mvillarrealb',
    tags: new Map([['k', 'v']]),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getRepositoryToken(BookMark), useFactory: repositoryMockFactory },
        BookmarkAdapter,
      ],
    }).compile();
    repository = module.get(getRepositoryToken(BookMark));
    provider   = module.get<BookmarkAdapter>(BookmarkAdapter);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  it('findAll', async () => {
    repository.find.mockReturnValueOnce([bookmark, bookmark, bookmark]);
    const response = await provider.findAll();
    expect(response).toHaveLength(3);
  });
  it('findBookMark', async () => {
    repository.findOne.mockReturnValueOnce(bookmark);
    const response = await provider.findBookMark('bm-id');
    expect(response).toHaveProperty('title', bookmark.title);
    expect(response).toHaveProperty('url', bookmark.url);
  });
  it('createBookMark', async () => {
    repository.save.mockReturnValueOnce(bookmark);
    const response = await provider.createBookMark(bookmark);
    expect(response).toHaveProperty('bookmarkId');
    expect(response).toHaveProperty('title', bookmark.title);
    expect(response).toHaveProperty('url', bookmark.url);
    expect(response).toHaveProperty('tags', bookmark.tags);
  });
  it('updateBookMark', async () => {
    const updated = Object.assign(bookmark, {});
    const result: UpdateResult = {
      raw: updated,
      affected: 1,
      generatedMaps: null,
    };
    repository.update.mockReturnValueOnce(result);
    repository.findOne.mockReturnValueOnce(updated);
    const response = await provider.updateBookMark('bm-id', updated);
    expect(response).toHaveProperty('title', updated.title);
    expect(response).toHaveProperty('url', updated.url);
  });
  it('deleteBookMark', async () => {
    const result: DeleteResult = {
      raw: bookmark,
      affected: 1,
    };
    repository.delete.mockReturnValueOnce(result);
    await expect(provider.deleteBookMark('bm-id')).resolves.not.toThrow();
  });
});
