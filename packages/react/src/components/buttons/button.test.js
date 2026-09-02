import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { CcButton, buildButtonClasses } from './button.jsx';

describe('buildButtonClasses', () => {
  test('omits default primary and md modifiers', () => {
    expect(buildButtonClasses()).toBe('corn-button');
  });

  test('adds variant, size, icon, and extra class names', () => {
    expect(
      buildButtonClasses({
        variant: 'danger',
        size: 'sm',
        icon: true,
        className: 'extra',
      })
    ).toBe('corn-button corn-button--danger corn-button--sm corn-button--icon extra');
  });
});

describe('CcButton', () => {
  test('renders a button with corn-button and type="button" by default', () => {
    render(<CcButton>Save</CcButton>);

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveClass('corn-button');
    expect(button).toHaveAttribute('type', 'button');
    expect(button.className).toBe('corn-button');
  });

  test('maps variant, size, and icon props to classes', () => {
    render(
      <CcButton variant="secondary" size="lg" icon aria-label="Close">
        x
      </CcButton>
    );

    expect(screen.getByRole('button', { name: 'Close' })).toHaveClass(
      'corn-button',
      'corn-button--secondary',
      'corn-button--lg',
      'corn-button--icon'
    );
  });

  test('forwards disabled and extra className', () => {
    render(
      <CcButton disabled className="toolbar-action">
        Delete
      </CcButton>
    );

    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('corn-button', 'toolbar-action');
  });

  test('renders an anchor without a type attribute when as="a"', () => {
    render(
      <CcButton as="a" href="#section">
        Link styled as button
      </CcButton>
    );

    const link = screen.getByRole('link', { name: 'Link styled as button' });
    expect(link).toHaveClass('corn-button');
    expect(link).toHaveAttribute('href', '#section');
    expect(link).not.toHaveAttribute('type');
  });

  test('allows type="submit" on a button', () => {
    render(<CcButton type="submit">Submit</CcButton>);

    expect(screen.getByRole('button', { name: 'Submit' })).toHaveAttribute('type', 'submit');
  });

  test('forwards a ref to the host element', () => {
    const ref = createRef();
    render(<CcButton ref={ref}>Save</CcButton>);

    expect(ref.current).toBe(screen.getByRole('button', { name: 'Save' }));
  });
});
