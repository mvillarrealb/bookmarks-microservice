/**
 * Categories to group BookMarks
 * @author Marco Villarreal
 */
export class Category {
    categoryId: string;
    title: string;
    description?: string;
    thumbnail?: Buffer;
    createdAt: Date;
    /**
     * Creates a category based on partial content
     * @constructor
     * @param body Partial category data
     */
    constructor(body: Partial<Category>) {
        Object.assign(this, body);
    }
}
