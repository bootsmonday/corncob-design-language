import { render, screen } from '@testing-library/react';
import { FieldStatus, fieldItemClassName, resolveFieldLabel } from './field.jsx';

describe('resolveFieldLabel', () => {
  test('prefers a label and falls back to children', () => {
    expect(resolveFieldLabel('Name', 'Child')).toBe('Name');
    expect(resolveFieldLabel(undefined, 'Child')).toBe('Child');
    expect(resolveFieldLabel('', 'Child')).toBe('Child');
  });

  test('returns null when both are empty', () => {
    expect(resolveFieldLabel(undefined, undefined)).toBeNull();
    expect(resolveFieldLabel('', '')).toBeNull();
  });
});

describe('fieldItemClassName', () => {
  test('adds the status variant and the item class', () => {
    expect(fieldItemClassName('error', 'custom-item')).toBe('corn-status--error custom-item');
    expect(fieldItemClassName(undefined, '')).toBe('');
  });
});

describe('FieldStatus', () => {
  test('renders status text and skips an empty status', () => {
    const { rerender } = render(<FieldStatus status="Required" />);

    expect(screen.getByText('Required')).toHaveClass('corn-status');

    rerender(<FieldStatus />);
    expect(document.querySelector('.corn-status')).toBeNull();
  });
});
