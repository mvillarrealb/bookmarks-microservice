import { Injectable, HttpService } from '@nestjs/common';
import { IScrapePort } from 'bookmarks-domain/src/ports';

@Injectable()
export class ScraperAdapter implements IScrapePort {
    constructor(private readonly httpService: HttpService) {}
    /**
     * Scrapes the html of a given url
     * @param url The url to scrape
     */
    async scrapeDocument(url: string): Promise<string> {
        const r = await this.httpService.get(url).toPromise();
        return r.data;
    }
}
