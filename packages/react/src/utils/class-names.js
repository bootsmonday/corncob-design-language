export function joinClassNames(...parts) {
  return parts.filter(Boolean).join(' ');
}

export function modifierClass(prefix, value, omit = []) {
  if (value == null || value === '' || value === false) return '';
  if (omit.includes(value)) return '';
  return `${prefix}${value}`;
}
