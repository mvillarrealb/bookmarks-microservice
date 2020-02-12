import * as crypto from 'crypto';
/**
 * Creates a md5 hash based on a string
 * @example
 *    md5('hello'); // returns '5d41402abc4b2a76b9719d911017c592'
 * @param {string} text The string to create the md5 hash
 */
export function md5(text: string) {
   return crypto.createHash('md5').update(text).digest('hex');
}
