import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { CcTextInput } from './text-input.jsx';

describe('CcTextInput', () => {
  test('renders the canonical field structure with matching id and htmlFor', () => {
    const { container } = render(
      <CcTextInput id="input--md" label="What is your name?" placeholder="Enter Full Name..." />
    );

    const item = container.querySelector('.corn-form--item');
    const control = container.querySelector('.corn-text-input');
    const input = screen.getByLabelText('What is your name?');
    const label = container.querySelector('label');

    expect(item.tagName).toBe('DIV');
    expect(item).toContainElement(control);
    expect(control).toContainElement(input);
    expect(control).toContainElement(label);
    expect(input).toHaveAttribute('id', 'input--md');
    expect(label).toHaveAttribute('for', 'input--md');
    expect(input).toHaveAttribute('placeholder', 'Enter Full Name...');
    expect(container.querySelector('.corn-status')).toBeNull();
  });

  test('adds a size class and assistive text on xs and sm labels', () => {
    const { rerender, container } = render(
      <CcTextInput size="xs" label="Name" placeholder="Enter Full Name..." />
    );

    expect(container.querySelector('.corn-text-input')).toHaveClass(
      'corn-text-input',
      'corn-text-input--xs'
    );
    expect(container.querySelector('label')).toHaveClass('corn-assistive-text');

    rerender(<CcTextInput size="sm" label="Name" placeholder="Enter Full Name..." />);
    expect(container.querySelector('label')).toHaveClass('corn-assistive-text');

    rerender(<CcTextInput size="lg" label="Name" placeholder="Enter Full Name..." />);
    expect(container.querySelector('.corn-text-input')).toHaveClass('corn-text-input--lg');
    expect(container.querySelector('label')).not.toHaveClass('corn-assistive-text');
  });

  test('renders status text and status variant on the form item', () => {
    const { container } = render(
      <CcTextInput
        label="Email"
        placeholder="you@example.com"
        status="Required"
        statusVariant="error"
      />
    );

    expect(container.querySelector('.corn-form--item')).toHaveClass('corn-status--error');
    expect(container.querySelector('.corn-status')).toHaveTextContent('Required');
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  test('does not override an explicit aria-invalid value', () => {
    render(
      <CcTextInput
        label="Email"
        placeholder="you@example.com"
        statusVariant="error"
        aria-invalid={false}
      />
    );

    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'false');
  });

  test('forwards disabled, name, and extra classes', () => {
    const { container } = render(
      <CcTextInput
        label="Name"
        placeholder="Enter Full Name..."
        name="fullName"
        disabled
        className="custom-input"
        itemClassName="custom-item"
      />
    );

    const input = screen.getByLabelText('Name');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('name', 'fullName');
    expect(container.querySelector('.corn-text-input')).toHaveClass('custom-input');
    expect(container.querySelector('.corn-form--item')).toHaveClass('custom-item');
  });

  test('forwards value and onChange to the input', () => {
    const onChange = jest.fn();
    render(
      <CcTextInput
        label="Name"
        placeholder="Enter Full Name..."
        value=""
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada' } });
    expect(onChange).toHaveBeenCalled();
  });

  test('forwards a ref to the native input', () => {
    const ref = createRef();
    render(<CcTextInput ref={ref} label="Name" placeholder="Enter Full Name..." />);

    expect(ref.current).toBe(screen.getByLabelText('Name'));
  });

  test('supports a callback ref on the native input', () => {
    const ref = jest.fn();
    render(<CcTextInput ref={ref} label="Name" placeholder="Enter Full Name..." />);

    expect(ref).toHaveBeenCalledWith(screen.getByLabelText('Name'));
  });
});
