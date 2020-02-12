import { BookMarkUseCase } from './bookmark.usecase';
import { IBookMarkPort, ICategoryPort } from '../ports';
import { BookMarkAdapter } from '../../test/bookmark.adapter.fixture';
import { CategoryAdapter } from '../../test/category.adapter.fixture';
import { ScrapedDocument, Category, BookMark } from '../domain';
import { md5 } from '../util/util';
import { ThrowOn } from '../domain/throw.enum';
import { AlreadyExistsError, NotFoundError } from '../errors';

describe('Bookmars usecase', () => {
    let bookmarkPort: IBookMarkPort;
    let categoryPort: ICategoryPort;
    let usecase: BookMarkUseCase;
    const mockCategory = new Category({
        categoryId: 'repositoriesmd5',
        title: 'Repositories',
        description: 'Github repos',
    });
    const title = 'Creating a bookmark api';
    const url = 'https://github.com/mvillarrealb/bookmarks-microservice';
    const tags = new Map<string, string>([['k', 'v']]);
    const document = new ScrapedDocument({
        title,
        url,
        tags,
    });
    const bookmark = new BookMark({
        bookmarkId: md5(title),
        title,
        url,
        tags,
    });
    beforeAll(() => {
        bookmarkPort = new BookMarkAdapter();
        categoryPort = new CategoryAdapter();
        usecase = new BookMarkUseCase(bookmarkPort, categoryPort);
    });
    it('Should build bookmark', () => {
        const bookMark = usecase.buildBookMark(document);
        expect(bookMark).toHaveProperty('title', title);
        expect(bookMark).toHaveProperty('url', url);
        expect(bookMark).toHaveProperty('tags', tags);
    });
    it('Should create bookmark', async () => {
       jest.spyOn(categoryPort, 'findCategory')
       .mockImplementationOnce(async (id: string) => mockCategory);
       jest.spyOn(bookmarkPort, 'createBookMark')
       .mockImplementationOnce(async (bm: Partial<BookMark>) => {
           Object.assign(bookmark, bm);
           return bookmark;
        });
       const created = await usecase.createBookMark('id', document);
       expect(created).toHaveProperty('bookmarkId', md5(title));
       expect(created).toHaveProperty('title', title);
       expect(created).toHaveProperty('url', url);
       expect(created).toHaveProperty('tags', tags);
       expect(created).toHaveProperty('createdAt');
       expect(created).toHaveProperty('category', mockCategory);
    });
    it('Should throw exceptions', async () => {
        jest.spyOn(bookmarkPort, 'findBookMark')
       .mockImplementationOnce(async (id: string) => bookmark);
        await expect(usecase.validateBookMark('id', ThrowOn.FOUND)).rejects.toThrow(AlreadyExistsError);

        jest.spyOn(bookmarkPort, 'findBookMark')
        .mockImplementationOnce(async (id: string) => undefined);
        await expect(usecase.validateBookMark('id', ThrowOn.NOT_FOUND)).rejects.toThrow(NotFoundError);
    });
    it('Should update bookmark', async () => {
        const updated = new BookMark({
            title: 'Updated',
            tags,
            url: 'http://updated',
        });
        jest.spyOn(bookmarkPort, 'findBookMark')
        .mockImplementationOnce(async (id: string) => bookmark);
        jest.spyOn(bookmarkPort, 'updateBookMark')
        .mockImplementationOnce(async (id: string, bm: BookMark) => bm);
        const result = await usecase.updateBookMark(':id', updated);
        expect(result).toHaveProperty('bookmarkId', md5(title));
        expect(result).toHaveProperty('title', updated.title);
        expect(result).toHaveProperty('url',  updated.url);
        expect(result).toHaveProperty('tags', tags);
        expect(result).toHaveProperty('updatedAt');
    });
    it('Should deletebookmark', async () => {
        jest.spyOn(bookmarkPort, 'findBookMark')
        .mockImplementationOnce(async (id: string) => bookmark);
        jest.spyOn(bookmarkPort, 'deleteBookMark')
        .mockImplementationOnce(async (id: string) => { let a = id; });
        await usecase.deleteBookMark(':id');
    });

});
