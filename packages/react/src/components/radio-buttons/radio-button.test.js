import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { CornRadioButton } from './radio-button.jsx';
import { CornRadioButtonGroup } from './radio-button-group.jsx';

describe('CornRadioButtonGroup', () => {
  test('renders a fieldset group with legend and checkbox items', () => {
    const { container } = render(
      <CornRadioButtonGroup legend="Options" name="example">
        <CornRadioButton>Radio One</CornRadioButton>
        <CornRadioButton>Radio Two</CornRadioButton>
      </CornRadioButtonGroup>
    );

    const group = screen.getByRole('group', { name: 'Options' });
    expect(group.tagName).toBe('FIELDSET');
    expect(group).toHaveClass('corn-form--item', 'corn-radio-button-group');
    expect(container.querySelectorAll('.corn-radio-button')).toHaveLength(2);
    expect(group.querySelector('legend')).toHaveTextContent('Options');
  });

  test('adds the inline modifier class', () => {
    render(
      <CornRadioButtonGroup legend="Group Label" name="example-inline" inline>
        <CornRadioButton>Inline One</CornRadioButton>
      </CornRadioButtonGroup>
    );

    expect(screen.getByRole('group', { name: 'Group Label' })).toHaveClass('corn-radio-button-group--inline');
  });
});

describe('CornRadioButton', () => {
  test('renders a radio input with matching id and htmlFor', () => {
    const { container } = render(
      <CornRadioButton id="ex1" name="example">
        Radio One
      </CornRadioButton>
    );

    const input = screen.getByRole('radio', { name: 'Radio One' });
    const label = container.querySelector('label');

    expect(input).toHaveAttribute('type', 'radio');
    expect(input).toHaveAttribute('id', 'ex1');
    expect(label).toHaveAttribute('for', 'ex1');
    expect(container.querySelector('.corn-radio-button')).toContainElement(input);
  });

  test('adds size and task classes on the item wrapper', () => {
    const { container } = render(
      <CornRadioButton size="lg" task>
        Task Complete
      </CornRadioButton>
    );

    expect(container.querySelector('.corn-radio-button')).toHaveClass('corn-radio-button', 'corn-radio-button--lg', 'corn-radio-button--task');
  });

  test('inherits name from the group and allows an override', () => {
    render(
      <CornRadioButtonGroup legend="Options" name="example">
        <CornRadioButton>One</CornRadioButton>
        <CornRadioButton name="other">Two</CornRadioButton>
      </CornRadioButtonGroup>
    );

    expect(screen.getByRole('checkbox', { name: 'One' })).toHaveAttribute('name', 'example');
    expect(screen.getByRole('checkbox', { name: 'Two' })).toHaveAttribute('name', 'other');
  });

  test('forwards disabled and checked', () => {
    render(
      <>
        <CornRadioButton disabled>Disabled</CornRadioButton>
        <CornRadioButton checked onChange={() => {}}>
          Checked
        </CornRadioButton>
      </>
    );

    expect(screen.getByRole('radio', { name: 'Disabled' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Checked' })).toBeChecked();
  });

  test('prefers uncontrolled state by default and supports controlled state when checked is passed', () => {
    const onChange = jest.fn();

    const { rerender } = render(<CornRadioButton defaultChecked>Default on</CornRadioButton>);

    const uncontrolled = screen.getByRole('radio', { name: 'Default on' });
    expect(uncontrolled).toBeChecked();

    fireEvent.click(uncontrolled);
    expect(uncontrolled).not.toBeChecked();
    expect(onChange).not.toHaveBeenCalled();

    rerender(
      <CornRadioButton checked onChange={onChange}>
        Controlled
      </CornRadioButton>
    );

    const controlled = screen.getByRole('radio', { name: 'Controlled' });
    expect(controlled).toBeChecked();

    fireEvent.click(controlled);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(controlled).toBeChecked();
  });

  test('sets the indeterminate DOM property', () => {
    render(<CornRadioButton indeterminate>Indeterminate checkbox</CornRadioButton>);

    expect(screen.getByRole('radio', { name: 'Indeterminate checkbox' }).indeterminate).toBe(true);
  });

  test('forwards a ref to the native input', () => {
    const ref = createRef();
    render(<CornRadioButton ref={ref}>One</CornRadioButton>);

    expect(ref.current).toBe(screen.getByRole('radio', { name: 'One' }));
  });
});
