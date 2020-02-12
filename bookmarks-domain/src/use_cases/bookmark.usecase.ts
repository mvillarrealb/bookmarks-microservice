import { IBookMarkPort, ICategoryPort } from '../ports';
import { BookMark, Category, ScrapedDocument } from '../domain';
import { ThrowOn } from '../domain/throw.enum';
import { AlreadyExistsError, NotFoundError } from '../errors';
import { CategoryUseCase } from './category.usecase';
import { md5 } from '../util/util';
/**
 * Handle a bookmark management with a Port
 * @author Marco Villarreal
 */
export class BookMarkUseCase {
    private categoryUsecase: CategoryUseCase;
    /**
     * Build a usecase based on its ports
     * @constructor
     * @param {IBookMarkPort} bookMarkPort - BookMarkPort implementation
     * @param {ICategoryPort} categoryPort - CategoryPort implementation
     */
    constructor(
        private readonly bookMarkPort: IBookMarkPort,
        private readonly categoryPort: ICategoryPort,
    ) {
        this.categoryUsecase = new CategoryUseCase(this.categoryPort);
    }
    /**
     * Create a bookmark in the specified category
     * based on a scrapped document
     *
     * @param {string} categoryId - The id of the category to assign to the document
     * @param {ScrapedDocument} document - The scrapped document
     */
    async createBookMark(categoryId: string, document: ScrapedDocument): Promise<BookMark> {
       const category = await this.categoryUsecase.validateCategory(categoryId, ThrowOn.NOT_FOUND);
       const bookmark = this.buildBookMark(document);
       bookmark.category = category;
       bookmark.createdAt = new Date();
       const created = await this.bookMarkPort.createBookMark(bookmark);
       return created;
    }
    /**
     * Create a new bookmark based on a scrapped document
     * @param document The scrapped document
     */
    buildBookMark(document: ScrapedDocument): BookMark {
        const {title, url, tags } = document;
        return new BookMark({
            bookmarkId: md5(title),
            title,
            url,
            tags,
        });
    }
    /**
     * Update a bookmark based on its id and a partial bookmark
     * @param {string} bookMarkId - The id of the bookmark
     * @param {BookMark} bookmark - The bookmark to be updated
     */
    async updateBookMark(bookMarkId: string, bookmark: BookMark): Promise<BookMark> {
        const found = await this.validateBookMark(bookMarkId, ThrowOn.NOT_FOUND);
        found.updatedAt = new Date();
        Object.assign(found, bookmark);
        const updated  = await this.bookMarkPort.updateBookMark(bookMarkId, found);
        return updated;
    }
    /**
     * Deletes a bookmark based on its id
     * @param {string} bookMarkId THe id of the bookmark to be deleted
     */
    async deleteBookMark(bookMarkId: string): Promise<void> {
        await this.validateBookMark(bookMarkId, ThrowOn.NOT_FOUND);
        await this.bookMarkPort.deleteBookMark(bookMarkId);
    }
    /**
     * Validate a bookmark based on its id, this validation
     * can throw an exception on any of the given cases
     * controlled by the ThrowOn enum
     * @param {string} bookMarkId The id of the bookmark
     * @param {ThrowOn} throwOn When to throw exceptions if found or not found
     */
    async validateBookMark(bookMarkId: string, throwOn?: ThrowOn): Promise<BookMark | undefined> {
        const exists = await this.bookMarkPort.findBookMark(bookMarkId);
        if (exists && throwOn === ThrowOn.FOUND) {
            throw new AlreadyExistsError(`BookMark with id ${bookMarkId} already exists`);
        } else if (!exists && throwOn === ThrowOn.NOT_FOUND) {
            throw new NotFoundError(`BookMark with id ${bookMarkId} does not exists`);
        }
        return exists;
    }
}
