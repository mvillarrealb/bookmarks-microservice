import { IScrapePort } from '../ports';
import { ScrapedDocument } from '../domain';
import * as cheerio from 'cheerio';
/**
 * Use case used to scrape content from an HTML
 * document, the document can be loaded from
 * any port implemented in IScrapePort interface
 *
 * @author Marco Villarreal
 */
export class ScrapeUseCase {
    /**
     * Meta tags to be xcluded from the scraping,
     * in this case we are exluding viewport tag
     * since we want only to extract opengraph & twitter tags
     * @property exclusionTags
     * @type {string[]}
     */
    private readonly exclusionTags: string[] = ['viewport'];
    /**
     * Create a new  ScrapeUseCase instance based on
     * its input port
     * @constructor
     * @param scrapePort The port to handle input extraction
     */
    constructor(
        private readonly scrapePort: IScrapePort,
    ) {}
    /**
     * Load the content of a given source using a scrape
     * port, the por can be an http url, local file, raw string
     * @param {string} source - The source to be loaded from port
     * @returns Scrapped document
     */
    async loadContent(source: string): Promise<ScrapedDocument> {
        const documentString = await this.scrapePort.scrapeDocument(source);
        const $ = cheerio.load(documentString);
        const tags = this.extractTags($);
        const title = $('title').text();
        const icon = $('link[rel="shortcut icon"]').attr('href');
        return new ScrapedDocument({
            title,
            tags,
            icon,
        });
    }
    /**
     * Extract the "meta" tags present in a html document
     * @param {CheerioStatic} $ - Cheerio static instance
     */
    extractTags($: CheerioStatic): Map<string, string> {
        const map = new Map();
        $('meta').each((i, el) => {
            const value = $(el).attr('content');
            let key: string;
            if ($(el).attr('property') !== undefined ) {
                key = $(el).attr('property');
            } else if ($(el).attr('name') !== undefined ) {
                key = $(el).attr('name');
            }
            if (key != null ) {
                if (!this.exclusionTags.includes(key)) {
                    map.set(key, value);
                }
            }
        });
        return map;
    }
}
