/**
 * Joins multiple class name parts into a single string, filtering out falsy values.
 * @param  {...string} parts The class name parts to join.
 * @returns {string} The joined class name string.
 */
export declare function joinClassNames(...parts: string[]): string;
/**
 * Generates a modifier class name based on the given prefix and value, optionally omitting certain values.
 * @param {string} prefix The prefix for the modifier class.
 * @param {string|boolean|null|undefined} value The value to append to the prefix.
 * @param {Array<string>} omit The list of values to omit.
 * @returns {string} The generated modifier class name or an empty string if omitted.
 */
export declare function modifierClass(prefix: string, value: string | boolean | null | undefined, omit?: Array<string>): string;
