import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBookMarkPort } from 'bookmarks-domain/src/ports';
import { BookMark } from 'bookmarks-domain/src/domain';

@Injectable()
export class BookmarkAdapter implements IBookMarkPort {
    constructor(
        @InjectRepository(BookMark)
        private readonly repository: Repository<BookMark>,
    ) {}
    findAll() {
        return this.repository.find();
    }
    findBookMark(bookmarkId: string): Promise<BookMark> {
        return this.repository.findOne(bookmarkId);
    }
    createBookMark(bookmark: Partial<BookMark>): Promise<BookMark> {
        return this.repository.save(bookmark);
    }
    async updateBookMark(bookmarkId: string, bookmark: Partial<BookMark>): Promise<BookMark> {
        const updated = await this.repository.update(bookmarkId, bookmark);
        return this.findBookMark(bookmarkId);
    }
    async deleteBookMark(bookmarkId: string): Promise<void> {
        const response = await this.repository.delete(bookmarkId);
    }

}
