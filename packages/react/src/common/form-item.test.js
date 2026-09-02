import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { CcFormItem } from './form-item.jsx';

describe('CcFormItem', () => {
  test('renders a div with corn-form--item by default', () => {
    render(<CcFormItem>Field</CcFormItem>);

    const item = screen.getByText('Field');
    expect(item.tagName).toBe('DIV');
    expect(item).toHaveClass('corn-form--item');
  });

  test('renders a fieldset when as="fieldset"', () => {
    render(
      <CcFormItem as="fieldset">
        <legend>Options</legend>
      </CcFormItem>
    );

    const item = screen.getByRole('group', { name: 'Options' });
    expect(item.tagName).toBe('FIELDSET');
    expect(item).toHaveClass('corn-form--item');
  });

  test('merges extra className after corn-form--item', () => {
    render(<CcFormItem className="corn-checkbox-group extra">Field</CcFormItem>);

    expect(screen.getByText('Field')).toHaveClass('corn-form--item', 'corn-checkbox-group', 'extra');
  });

  test('forwards a ref to the host element', () => {
    const ref = createRef();
    render(<CcFormItem ref={ref}>Field</CcFormItem>);

    expect(ref.current).toBe(screen.getByText('Field'));
  });

  test('supports a callback ref', () => {
    const ref = jest.fn();
    render(<CcFormItem ref={ref}>Field</CcFormItem>);

    expect(ref).toHaveBeenCalledWith(screen.getByText('Field'));
  });
});
