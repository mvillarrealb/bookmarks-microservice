import { Category } from './category.entity';
/**
 * A representation of a simple bookmark, this
 * bookmark is nested inside a Category
 * @author Marco Villarreal
 */
export class BookMark {
    bookmarkId: string;
    title: string;
    url: string;
    thumbnail: Buffer;
    category: Category;
    tags: Map<string, string>;
    createdAt: Date;
    updatedAt: Date;
    /**
     * Constructs a bookmark based on partial body
     * @param body Partial bookmark body
     */
    constructor(body: Partial<BookMark>) {
        Object.assign(this, body);
    }
}
