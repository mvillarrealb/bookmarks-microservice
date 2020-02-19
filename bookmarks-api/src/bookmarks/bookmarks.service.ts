import { Injectable } from '@nestjs/common';
import { BookmarkAdapter } from './bookmark.adapter';
import { ScraperService } from '../scraper/scraper.service';
import { BookMarkUseCase } from 'bookmarks-domain/src/use_cases';
import { CategoryAdapter } from '../category/category.adapter';

@Injectable()
export class BookmarksService extends BookMarkUseCase {
    constructor(
        private readonly adapter: BookmarkAdapter,
        private readonly scraper: ScraperService,
        private readonly category: CategoryAdapter,
    ) {
        super(adapter, category);
    }
    async create(categoryId: string, urlToBookmark: string) {
       const document = await this.scraper.loadContent(urlToBookmark);
       return super.createBookMark(categoryId, document);
    }
    findAll() {
        return this.adapter.findAll();
    }
}
