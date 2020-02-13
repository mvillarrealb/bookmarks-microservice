import { Injectable } from '@nestjs/common';
import { ScrapeUseCase } from 'bookmarks-domain/src/use_cases';
import { ScraperAdapter } from './scraper.adapter';

@Injectable()
export class ScraperService extends ScrapeUseCase {
    constructor(adapter: ScraperAdapter) {
        super(adapter);
    }
}
