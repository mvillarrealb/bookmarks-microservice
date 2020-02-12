import { Category } from '../domain';
/**
 * CategoryPort represents input & output
 * boundaries used to interact with domain
 * bookmark category
 * @interface
 * @author Marco Villarreal
 */
export interface ICategoryPort {
    /**
     * Finds a given category based on its Id
     * @param categoryId The id of the category to be found
     */
    findCategory(categoryId: string): Promise<Category>;
    /**
     * Create a new category
     * @param category The category to be created
     */
    createCategory(category: Category): Promise<Category>;
    /**
     * Update a category's title and description based on its id
     * @param categoryId The id of the category to be updated
     * @param title The updated title of the category
     * @param description The updated description of the category
     */
    updateCategory(categoryId: string, category: Partial<Category>): Promise<Category>;
    /**
     * Deletes a category based on its id
     * @param categoryId Category id to be deleted
     */
    deleteCategory(categoryId: string): Promise<void>;
}
