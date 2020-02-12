/**
 * Represents a scrapped document,
 * the document contain basic metadata
 * like: title, icon and tags
 *
 * @author Marco Villarreal
 */
export class ScrapedDocument {
    title: string;
    icon: string;
    url: string;
    tags: Map<string, string>;
    /**
     * @constructor
     * @param body Partial body used to create a document
     */
    constructor(body: Partial<ScrapedDocument>) {
        Object.assign(this, body);
    }
}
