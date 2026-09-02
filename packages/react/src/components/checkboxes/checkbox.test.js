import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { CcCheckbox } from './checkbox.jsx';
import { CcCheckboxGroup } from './checkbox-group.jsx';

describe('CcCheckboxGroup', () => {
  test('renders a fieldset group with legend and checkbox items', () => {
    const { container } = render(
      <CcCheckboxGroup legend="Options" name="example">
        <CcCheckbox>Checkbox One</CcCheckbox>
        <CcCheckbox>Checkbox Two</CcCheckbox>
      </CcCheckboxGroup>
    );

    const group = screen.getByRole('group', { name: 'Options' });
    expect(group.tagName).toBe('FIELDSET');
    expect(group).toHaveClass('corn-form--item', 'corn-checkbox-group');
    expect(container.querySelectorAll('.corn-checkbox')).toHaveLength(2);
    expect(group.querySelector('legend')).toHaveTextContent('Options');
  });

  test('adds the inline modifier class', () => {
    render(
      <CcCheckboxGroup legend="Group Label" name="example-inline" inline>
        <CcCheckbox>Inline One</CcCheckbox>
      </CcCheckboxGroup>
    );

    expect(screen.getByRole('group', { name: 'Group Label' })).toHaveClass(
      'corn-checkbox-group--inline'
    );
  });
});

describe('CcCheckbox', () => {
  test('renders a checkbox input with matching id and htmlFor', () => {
    const { container } = render(
      <CcCheckbox id="ex1" name="example">
        Checkbox One
      </CcCheckbox>
    );

    const input = screen.getByRole('checkbox', { name: 'Checkbox One' });
    const label = container.querySelector('label');

    expect(input).toHaveAttribute('type', 'checkbox');
    expect(input).toHaveAttribute('id', 'ex1');
    expect(label).toHaveAttribute('for', 'ex1');
    expect(container.querySelector('.corn-checkbox')).toContainElement(input);
  });

  test('adds size and task classes on the item wrapper', () => {
    const { container } = render(
      <CcCheckbox size="lg" task>
        Task Complete
      </CcCheckbox>
    );

    expect(container.querySelector('.corn-checkbox')).toHaveClass(
      'corn-checkbox',
      'corn-checkbox--lg',
      'corn-checkbox--task'
    );
  });

  test('inherits name from the group and allows an override', () => {
    render(
      <CcCheckboxGroup legend="Options" name="example">
        <CcCheckbox>One</CcCheckbox>
        <CcCheckbox name="other">Two</CcCheckbox>
      </CcCheckboxGroup>
    );

    expect(screen.getByRole('checkbox', { name: 'One' })).toHaveAttribute('name', 'example');
    expect(screen.getByRole('checkbox', { name: 'Two' })).toHaveAttribute('name', 'other');
  });

  test('forwards disabled and checked', () => {
    render(
      <>
        <CcCheckbox disabled>Disabled</CcCheckbox>
        <CcCheckbox checked onChange={() => {}}>
          Checked
        </CcCheckbox>
      </>
    );

    expect(screen.getByRole('checkbox', { name: 'Disabled' })).toBeDisabled();
    expect(screen.getByRole('checkbox', { name: 'Checked' })).toBeChecked();
  });

  test('sets the indeterminate DOM property', () => {
    render(<CcCheckbox indeterminate>Indeterminate checkbox</CcCheckbox>);

    expect(screen.getByRole('checkbox', { name: 'Indeterminate checkbox' }).indeterminate).toBe(
      true
    );
  });

  test('forwards a ref to the native input', () => {
    const ref = createRef();
    render(<CcCheckbox ref={ref}>One</CcCheckbox>);

    expect(ref.current).toBe(screen.getByRole('checkbox', { name: 'One' }));
  });
});
