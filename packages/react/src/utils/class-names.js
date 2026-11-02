/**
 * Joins multiple class name parts into a single string, filtering out falsy values.
 * @param  {...string} parts The class name parts to join.
 * @returns {string} The joined class name string.
 */
export function joinClassNames(...parts) {
  return parts.filter(Boolean).join(' ');
}

/**
 * Generates a modifier class name based on the given prefix and value, optionally omitting certain values.
 * @param {string} prefix The prefix for the modifier class.
 * @param {string|boolean|null|undefined} value The value to append to the prefix.
 * @param {Array<string>} omit The list of values to omit.
 * @returns {string} The generated modifier class name or an empty string if omitted.
 */
export function modifierClass(prefix, value, omit = []) {
  if (value == null || value === '' || value === false) return '';
  if (omit.includes(value)) return '';
  return `${prefix}${value}`;
}
