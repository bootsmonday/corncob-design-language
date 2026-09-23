import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { CornButton } from './button.jsx';

// describe('buildButtonClasses', () => {
//   test('omits default primary and md modifiers', () => {
//     expect(buildButtonClasses()).toBe('corn-button');
//   });

//   test('adds variant, size, icon, and extra class names', () => {
//     expect(
//       buildButtonClasses({
//         variant: 'danger',
//         size: 'sm',
//         icon: true,
//         className: 'extra',
//       })
//     ).toBe('corn-button corn-button--danger corn-button--sm corn-button--icon extra');
//   });
// });

describe('CornButton', () => {
  test('renders a button with corn-button and type="button" by default', () => {
    render(<CornButton>Save</CornButton>);

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveClass('corn-button');
    expect(button).toHaveAttribute('type', 'button');
    expect(button.className).toBe('corn-button');
  });

  test('maps variant, size, and icon props to classes', () => {
    render(
      <CornButton variant="secondary" size="lg" icon aria-label="Close">
        x
      </CornButton>
    );

    expect(screen.getByRole('button', { name: 'Close' })).toHaveClass('corn-button', 'corn-button--secondary', 'corn-button--lg', 'corn-button--icon');
  });

  test('forwards disabled and extra className', () => {
    render(
      <CornButton disabled className="toolbar-action">
        Delete
      </CornButton>
    );

    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('corn-button', 'toolbar-action');
  });

  test('renders an anchor without a type attribute when as="a"', () => {
    render(
      <CornButton as="a" href="#section">
        Link styled as button
      </CornButton>
    );

    const link = screen.getByRole('link', { name: 'Link styled as button' });
    expect(link).toHaveClass('corn-button');
    expect(link).toHaveAttribute('href', '#section');
    expect(link).not.toHaveAttribute('type');
  });

  test('allows type="submit" on a button', () => {
    render(<CornButton type="submit">Submit</CornButton>);

    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).not.toBeDisabled();
    expect(button).not.toHaveAttribute('aria-busy');
  });

  test('keeps a submit button enabled outside a pending form', () => {
    render(
      <form>
        <CornButton type="submit">Save</CornButton>
      </form>
    );

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).not.toBeDisabled();
    expect(button).not.toHaveAttribute('aria-busy');
  });

  test('forwards a ref to the host element', () => {
    const ref = createRef();
    render(<CornButton ref={ref}>Save</CornButton>);

    expect(ref.current).toBe(screen.getByRole('button', { name: 'Save' }));
  });

  test('supports a callback ref', () => {
    const ref = jest.fn();
    render(<CornButton ref={ref}>Save</CornButton>);

    expect(ref).toHaveBeenCalledWith(screen.getByRole('button', { name: 'Save' }));
  });
});
