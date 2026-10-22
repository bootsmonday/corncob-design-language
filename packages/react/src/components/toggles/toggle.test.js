import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { CornToggle, CornToggleGroup } from './toggle.jsx';

describe('CornToggleGroup', () => {
  test('renders a fieldset group with legend and toggle items', () => {
    const { container } = render(
      <CornToggleGroup legend="Group Label" name="example">
        <CornToggle>One</CornToggle>
        <CornToggle>Two</CornToggle>
      </CornToggleGroup>
    );

    const group = screen.getByRole('group', { name: 'Group Label' });
    expect(group.tagName).toBe('FIELDSET');
    expect(group).toHaveClass('corn-form--item', 'corn-toggle-group', 'corn-toggle--md');
    expect(container.querySelectorAll('.corn-toggle')).toHaveLength(2);
    expect(container.querySelector('.corn-toggles')).toBeInTheDocument();
    expect(group.querySelector('legend')).toHaveTextContent('Group Label');
  });

  test('applies size and custom classes', () => {
    const { container } = render(
      <CornToggleGroup legend="Sized Group" name="example-sized" size="xl" className="custom-group" togglesClassName="custom-toggles">
        <CornToggle>One</CornToggle>
      </CornToggleGroup>
    );

    expect(screen.getByRole('group', { name: 'Sized Group' })).toHaveClass('corn-toggle--xl', 'custom-group');
    expect(container.querySelector('.corn-toggles')).toHaveClass('custom-toggles');
  });

  test('inherits name from the group and allows an override', () => {
    render(
      <CornToggleGroup legend="Options" name="example">
        <CornToggle>One</CornToggle>
        <CornToggle name="other">Two</CornToggle>
      </CornToggleGroup>
    );

    expect(screen.getByRole('radio', { name: 'One' })).toHaveAttribute('name', 'example');
    expect(screen.getByRole('radio', { name: 'Two' })).toHaveAttribute('name', 'other');
  });
});

describe('CornToggle', () => {
  test('renders a radio input with matching id and htmlFor', () => {
    const { container } = render(
      <CornToggle id="toggle-one" name="example">
        One
      </CornToggle>
    );

    const input = screen.getByRole('radio', { name: 'One' });
    const label = container.querySelector('label');

    expect(input).toHaveAttribute('type', 'radio');
    expect(input).toHaveAttribute('id', 'toggle-one');
    expect(label).toHaveAttribute('for', 'toggle-one');
    expect(container.querySelector('.corn-toggle')).toContainElement(input);
  });

  test('forwards disabled and checked', () => {
    render(
      <>
        <CornToggle disabled>Disabled</CornToggle>
        <CornToggle checked onChange={() => {}}>
          Checked
        </CornToggle>
      </>
    );

    expect(screen.getByRole('radio', { name: 'Disabled' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Checked' })).toBeChecked();
  });

  test('supports icon-only labels and keeps label association intact', () => {
    render(
      <CornToggleGroup legend="Icon Group" name="icon-options">
        <CornToggle value="lock" defaultChecked>
          <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon" aria-label="Lock">
            <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#lock"></use>
          </svg>
        </CornToggle>
        <CornToggle value="unlock">
          <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon" aria-label="Unlock">
            <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#unlock"></use>
          </svg>
        </CornToggle>
      </CornToggleGroup>
    );

    const lockToggle = screen.getByRole('radio', { name: 'Lock' });
    const unlockToggle = screen.getByRole('radio', { name: 'Unlock' });

    expect(lockToggle).toBeChecked();
    expect(unlockToggle).not.toBeChecked();

    fireEvent.click(unlockToggle);
    expect(unlockToggle).toBeChecked();
    expect(lockToggle).not.toBeChecked();
  });

  test('prefers uncontrolled state by default and allows selecting an unchecked toggle in the same group', () => {
    render(
      <>
        <CornToggle name="options" defaultChecked>
          Default on
        </CornToggle>
        <CornToggle name="options">Default off</CornToggle>
      </>
    );

    const defaultOn = screen.getByRole('radio', { name: 'Default on' });
    const defaultOff = screen.getByRole('radio', { name: 'Default off' });

    expect(defaultOn).toBeChecked();
    expect(defaultOff).not.toBeChecked();

    fireEvent.click(defaultOff);
    expect(defaultOff).toBeChecked();
    expect(defaultOn).not.toBeChecked();
  });

  test('supports controlled state when checked is passed', () => {
    const onChange = jest.fn();
    render(
      <CornToggle checked={false} onChange={onChange}>
        Controlled
      </CornToggle>
    );

    const controlled = screen.getByRole('radio', { name: 'Controlled' });
    expect(controlled).not.toBeChecked();

    fireEvent.click(controlled);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(controlled).not.toBeChecked();
  });

  test('forwards a ref to the native input', () => {
    const ref = createRef();
    render(<CornToggle ref={ref}>One</CornToggle>);

    expect(ref.current).toBe(screen.getByRole('radio', { name: 'One' }));
  });

  test('renders static markup for server-side rendering', () => {
    const html = renderToString(
      <CornToggleGroup legend="Server Group" name="server-group" size="lg">
        <CornToggle id="server-one" defaultChecked>
          One
        </CornToggle>
        <CornToggle id="server-two">Two</CornToggle>
      </CornToggleGroup>
    );

    expect(html).toContain('corn-toggle-group');
    expect(html).toContain('corn-toggle--lg');
    expect(html).toContain('corn-toggles');
    expect(html).toContain('id="server-one"');
    expect(html).toContain('Server Group');
  });
});
