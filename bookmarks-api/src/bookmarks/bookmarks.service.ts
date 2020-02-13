import { Injectable } from '@nestjs/common';
import { BookmarkAdapter } from './bookmark.adapter';
import { ScraperService } from '../scraper/scraper.service';
import { BookMarkUseCase } from 'bookmarks-domain/src/use_cases';

@Injectable()
export class BookmarksService extends BookMarkUseCase {
    constructor(
        private readonly adapter: BookmarkAdapter,
        private readonly scraper: ScraperService,
    ) {
        super(adapter, null);
    }
    async create(categoryId: string, urlToBookmark: string) {
       const document = await this.scraper.loadContent(urlToBookmark);
       return super.createBookMark(categoryId, document);
    }
    findAll() {
        return this.adapter.findAll();
    }
}
