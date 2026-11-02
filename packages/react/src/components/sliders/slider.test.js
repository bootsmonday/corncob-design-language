import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { CornSlider } from './slider.jsx';

describe('CornSlider', () => {
  test('renders slider structure with linked label and default classes', () => {
    const { container } = render(<CornSlider id="slider-default" label="Adjust the Corn Slider:" />);

    const input = screen.getByLabelText('Adjust the Corn Slider:');
    const label = container.querySelector('label');
    const wrapper = container.querySelector('.corn-slider');
    const item = container.querySelector('.corn-form--item');

    expect(item).toBeInTheDocument();
    expect(wrapper).toHaveClass('corn-slider', 'corn-slider--md');
    expect(input).toHaveAttribute('type', 'range');
    expect(input).toHaveAttribute('id', 'slider-default');
    expect(label).toHaveAttribute('for', 'slider-default');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
    expect(input).toHaveValue('50');
  });

  test('applies size and custom classes', () => {
    const { container } = render(<CornSlider label="Size slider" size="xl" className="custom-slider" itemClassName="custom-item" />);

    expect(container.querySelector('.corn-slider')).toHaveClass('corn-slider', 'corn-slider--xl', 'custom-slider');
    expect(container.querySelector('.corn-form--item')).toHaveClass('custom-item');
  });

  test('forwards min/max/step/disabled/name props', () => {
    render(<CornSlider label="Props slider" name="props-slider" min={10} max={90} step={5} disabled />);

    const input = screen.getByLabelText('Props slider');
    expect(input).toHaveAttribute('name', 'props-slider');
    expect(input).toHaveAttribute('min', '10');
    expect(input).toHaveAttribute('max', '90');
    expect(input).toHaveAttribute('step', '5');
    expect(input).toBeDisabled();
  });

  test('supports uncontrolled usage', () => {
    render(<CornSlider id="slider-state-uncontrolled" label="Slider state" defaultValue={25} />);

    const uncontrolled = screen.getByLabelText('Slider state');
    expect(uncontrolled).toHaveValue('25');

    fireEvent.change(uncontrolled, { target: { value: '30' } });
    expect(uncontrolled).toHaveValue('30');
  });

  test('supports controlled usage', () => {
    const onChange = jest.fn();
    render(<CornSlider id="slider-state-controlled" label="Slider state" value={40} onChange={onChange} />);

    const controlled = screen.getByLabelText('Slider state');
    expect(controlled).toHaveValue('40');
    fireEvent.change(controlled, { target: { value: '45' } });
    expect(onChange).toHaveBeenCalled();
  });

  test('forwards refs to the native range input', () => {
    const ref = createRef();
    render(<CornSlider ref={ref} label="Ref slider" />);

    expect(ref.current).toBe(screen.getByLabelText('Ref slider'));
  });

  test('renders static markup for server-side rendering', () => {
    const html = renderToString(<CornSlider id="server-slider" label="Server slider" size="lg" min={5} max={25} />);

    expect(html).toContain('corn-slider');
    expect(html).toContain('corn-slider--lg');
    expect(html).toContain('id="server-slider"');
    expect(html).toContain('Server slider');
    expect(html).toContain('type="range"');
    expect(html).toContain('min="5"');
    expect(html).toContain('max="25"');
  });
});
