import { ICategoryPort } from '../ports';
import { Category } from '../domain';
import { md5 } from '../util/util';
import { ThrowOn } from '../domain/throw.enum';
import { AlreadyExistsError, NotFoundError } from '../errors';
/**
 * @author Marco Villarreal
 */
export class CategoryUseCase {
    /**
     * @constructor
     * @param categoryPort The Category port used to interact outside the boundaries
     */
    constructor(
        private readonly categoryPort: ICategoryPort,
    ) {}
    /**
     * Create a new Bookmarking category
     * @param {string} title - The title of the category
     * @param {string} description - An optional description for the category
     */
    async createCategory(title: string, description: string): Promise<Category> {
        const categoryId = md5(title);
        await this.validateCategory(categoryId, ThrowOn.FOUND);
        const category = new Category({
            categoryId,
            title,
            description,
            createdAt: new Date(),
        });
        const created = await this.categoryPort.createCategory(category);
        return created;
    }
    /**
     * Update a category title and description based on its id and title
     * @param categoryId The category id
     * @param title Title to be updated
     * @param description Description to be updated
     */
    async updateCategory(categoryId: string, title: string, description: string): Promise<Category>  {
        const category = await this.validateCategory(categoryId, ThrowOn.NOT_FOUND);
        Object.assign(category, {
            title,
            description,
            updatedAt: new Date(),
        });
        const updated  = await this.categoryPort.updateCategory(categoryId, category);
        return updated;
    }
    /**
     * Deletes a category based on its id
     * @param categoryId Category id to be deleted
     */
    async deleteCategory(categoryId: string): Promise<void> {
        await this.validateCategory(categoryId, ThrowOn.NOT_FOUND);
        await this.categoryPort.deleteCategory(categoryId);
    }
    /**
     * Validate a category based on its id can throw either
     * a AlreadyExistsError and a NotFoundError based on the ThrowOn
     * Enum
     * @example
     *  const nonExistent = await i.validateCategory('not_exists', ThrowOn.NOT_FOUND)
     *  const existent = await i.validateCategory('exists', ThrowOn.FOUND)
     * @throws {AlreadyExistsError} When ThrowOn enum is set on FOUND and the category exists
     * @throws {NotFoundError} When ThrowOn enum is set on NOT_FOUND and the category not exists
     * @param categoryId The id of the category to be validated
     * @param onEmptyThrow The throw parameter
     */
    async validateCategory(categoryId: string, throwOn: ThrowOn): Promise<Category | undefined> {
        const exists = await this.categoryPort.findCategory(categoryId);
        if (exists && throwOn === ThrowOn.FOUND) {
            throw new AlreadyExistsError(`Category with id ${categoryId} already exists`);
        } else if (!exists && throwOn === ThrowOn.NOT_FOUND) {
            throw new NotFoundError(`Category with id ${categoryId} does not exists`);
        }
        return exists;
    }
}
