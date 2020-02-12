/**
 * An enum representing in wich case should
 * throw errors from a find operation
 */
export enum ThrowOn {
    /**
     * Throws an error when the resource is found
     */
    FOUND,
    /**
     * Throws an error when the resource is not found
     */
    NOT_FOUND,
}
