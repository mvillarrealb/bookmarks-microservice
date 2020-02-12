import { IBookMarkPort } from '../src/ports';
import { BookMark } from '../src/domain';

export class BookMarkAdapter implements IBookMarkPort {
    findBookMark(bookmarkId: string): Promise<BookMark> {
        throw new Error('Method not implemented.');
    }
    createBookMark(bookmark: Partial<BookMark>): Promise<BookMark> {
        throw new Error('Method not implemented.');
    }
    updateBookMark(bookmarkId: string, bookmark: Partial<BookMark>): Promise<BookMark> {
        throw new Error('Method not implemented.');
    }
    deleteBookMark(bookmarkId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
