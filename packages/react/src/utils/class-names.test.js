import { joinClassNames, modifierClass } from './class-names.js';

describe('joinClassNames', () => {
  test('drops empty values and joins the rest', () => {
    expect(joinClassNames('corn-button', false, '', null, undefined, 'extra')).toBe('corn-button extra');
  });
});

describe('modifierClass', () => {
  test('builds a modifier class', () => {
    expect(modifierClass('corn-button--', 'secondary')).toBe('corn-button--secondary');
  });

  test('omits empty values and listed defaults', () => {
    expect(modifierClass('corn-button--', 'primary', ['primary'])).toBe('');
    expect(modifierClass('corn-button--', 'md', ['md'])).toBe('');
    expect(modifierClass('corn-badge--', '', ['neutral'])).toBe('');
    expect(modifierClass('corn-message--', null)).toBe('');
    expect(modifierClass('corn-message--', false)).toBe('');
  });
});
