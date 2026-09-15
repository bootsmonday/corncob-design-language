import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { CornCheckbox } from './checkbox.jsx';
import { CornCheckboxGroup } from './checkbox-group.jsx';

describe('CornCheckboxGroup', () => {
  test('renders a fieldset group with legend and checkbox items', () => {
    const { container } = render(
      <CornCheckboxGroup legend="Options" name="example">
        <CornCheckbox>Checkbox One</CornCheckbox>
        <CornCheckbox>Checkbox Two</CornCheckbox>
      </CornCheckboxGroup>
    );

    const group = screen.getByRole('group', { name: 'Options' });
    expect(group.tagName).toBe('FIELDSET');
    expect(group).toHaveClass('corn-form--item', 'corn-checkbox-group');
    expect(container.querySelectorAll('.corn-checkbox')).toHaveLength(2);
    expect(group.querySelector('legend')).toHaveTextContent('Options');
  });

  test('adds the inline modifier class', () => {
    render(
      <CornCheckboxGroup legend="Group Label" name="example-inline" inline>
        <CornCheckbox>Inline One</CornCheckbox>
      </CornCheckboxGroup>
    );

    expect(screen.getByRole('group', { name: 'Group Label' })).toHaveClass('corn-checkbox-group--inline');
  });
});

describe('CornCheckbox', () => {
  test('renders a checkbox input with matching id and htmlFor', () => {
    const { container } = render(
      <CornCheckbox id="ex1" name="example">
        Checkbox One
      </CornCheckbox>
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
      <CornCheckbox size="lg" task>
        Task Complete
      </CornCheckbox>
    );

    expect(container.querySelector('.corn-checkbox')).toHaveClass('corn-checkbox', 'corn-checkbox--lg', 'corn-checkbox--task');
  });

  test('inherits name from the group and allows an override', () => {
    render(
      <CornCheckboxGroup legend="Options" name="example">
        <CornCheckbox>One</CornCheckbox>
        <CornCheckbox name="other">Two</CornCheckbox>
      </CornCheckboxGroup>
    );

    expect(screen.getByRole('checkbox', { name: 'One' })).toHaveAttribute('name', 'example');
    expect(screen.getByRole('checkbox', { name: 'Two' })).toHaveAttribute('name', 'other');
  });

  test('forwards disabled and checked', () => {
    render(
      <>
        <CornCheckbox disabled>Disabled</CornCheckbox>
        <CornCheckbox checked onChange={() => {}}>
          Checked
        </CornCheckbox>
      </>
    );

    expect(screen.getByRole('checkbox', { name: 'Disabled' })).toBeDisabled();
    expect(screen.getByRole('checkbox', { name: 'Checked' })).toBeChecked();
  });

  test('prefers uncontrolled state by default and supports controlled state when checked is passed', () => {
    const onChange = jest.fn();

    const { rerender } = render(<CornCheckbox defaultChecked>Default on</CornCheckbox>);

    const uncontrolled = screen.getByRole('checkbox', { name: 'Default on' });
    expect(uncontrolled).toBeChecked();

    fireEvent.click(uncontrolled);
    expect(uncontrolled).not.toBeChecked();
    expect(onChange).not.toHaveBeenCalled();

    rerender(
      <CornCheckbox checked onChange={onChange}>
        Controlled
      </CornCheckbox>
    );

    const controlled = screen.getByRole('checkbox', { name: 'Controlled' });
    expect(controlled).toBeChecked();

    fireEvent.click(controlled);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(controlled).toBeChecked();
  });

  test('sets the indeterminate DOM property', () => {
    render(<CornCheckbox indeterminate>Indeterminate checkbox</CornCheckbox>);

    expect(screen.getByRole('checkbox', { name: 'Indeterminate checkbox' }).indeterminate).toBe(true);
  });

  test('forwards a ref to the native input', () => {
    const ref = createRef();
    render(<CornCheckbox ref={ref}>One</CornCheckbox>);

    expect(ref.current).toBe(screen.getByRole('checkbox', { name: 'One' }));
  });

  test('supports a callback ref and keeps indeterminate in sync', () => {
    const ref = jest.fn();
    render(
      <CornCheckbox ref={ref} indeterminate>
        Indeterminate checkbox
      </CornCheckbox>
    );

    const input = screen.getByRole('checkbox', { name: 'Indeterminate checkbox' });
    expect(ref).toHaveBeenCalledWith(input);
    expect(input.indeterminate).toBe(true);
  });
});
