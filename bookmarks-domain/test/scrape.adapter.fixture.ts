import { IScrapePort } from '../src/ports';

export class ScrapeAdapter implements IScrapePort {
    async scrapeDocument(url: string): Promise<string> {
        return url;
    }
}
