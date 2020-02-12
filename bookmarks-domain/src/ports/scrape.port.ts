/**
 * A port defined to handle the extraction of a
 * document from a given url, this implementation
 * can be a local file a remote ftp file an
 * http webpage etc.
 * @interface
 * @author Marco Villarreal
 */
export interface IScrapePort {
    /**
     * Scrapes a document from the given url
     * @param {string} url The url to be scraped
     */
    scrapeDocument(url: string): Promise<string>;
}
