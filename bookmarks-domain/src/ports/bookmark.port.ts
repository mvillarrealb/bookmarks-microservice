import { BookMark } from '../domain';
/**
 * Bookmarks Port used to interact inside with
 * the BookMark use cases
 * @interface
 * @author Marco Villarreal
 */
export interface IBookMarkPort {
    /**
     * Finds a bookmark based on its id
     * @param {string} bookmarkId The bookmark to be found
     */
    findBookMark(bookmarkId: string): Promise<BookMark| undefined>;
    /**
     * Create a new bookmark based on a Bookmark instance
     * @param {Partial<BookMark>} bookmark The bookmark to be created
     */
    createBookMark(bookmark: Partial<BookMark>): Promise<BookMark>;
    /**
     * Update a bookmark based on its Id and partial body
     * @param {string} bookmarkId The id of the bookmark to be updated
     * @param {Partial<BookMark>} bookmark The partial body to update
     */
    updateBookMark(bookmarkId: string, bookmark: Partial<BookMark>): Promise<BookMark>;
    /**
     * Delete a bookmark based on its id
     * @param {string} bookmarkId Bookmark id to be deleted
     */
    deleteBookMark(bookmarkId: string): Promise<void>;
}
