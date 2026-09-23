import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { CornFormItem } from './form-item.jsx';

describe('CornFormItem', () => {
  test('renders a div with corn-form--item by default', () => {
    render(<CornFormItem>Field</CornFormItem>);

    const item = screen.getByText('Field');
    expect(item.tagName).toBe('DIV');
    expect(item).toHaveClass('corn-form--item');
  });

  test('renders a fieldset when as="fieldset"', () => {
    render(
      <CornFormItem as="fieldset">
        <legend>Options</legend>
      </CornFormItem>
    );

    const item = screen.getByRole('group', { name: 'Options' });
    expect(item.tagName).toBe('FIELDSET');
    expect(item).toHaveClass('corn-form--item');
  });

  test('merges extra className after corn-form--item', () => {
    render(<CornFormItem className="corn-checkbox-group extra">Field</CornFormItem>);

    expect(screen.getByText('Field')).toHaveClass('corn-form--item', 'corn-checkbox-group', 'extra');
  });

  test('forwards a ref to the host element', () => {
    const ref = createRef();
    render(<CornFormItem ref={ref}>Field</CornFormItem>);

    expect(ref.current).toBe(screen.getByText('Field'));
  });

  test('supports a callback ref', () => {
    const ref = jest.fn();
    render(<CornFormItem ref={ref}>Field</CornFormItem>);

    expect(ref).toHaveBeenCalledWith(screen.getByText('Field'));
  });
});
