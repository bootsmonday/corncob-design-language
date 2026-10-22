import { createRef } from 'react';
import { render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { CornToast } from './toast.jsx';

describe('CornToast', () => {
  test('renders corn-toast host with default class', () => {
    const { container } = render(<CornToast />);

    const toast = container.querySelector('corn-toast');
    expect(toast).toBeTruthy();
    expect(toast).toHaveClass('corn-toast');
  });

  test('supports custom class names and attributes', () => {
    const { container } = render(<CornToast className="toast-stack" count="3" delay="2500" />);

    const toast = container.querySelector('corn-toast');
    expect(toast).toHaveClass('corn-toast', 'toast-stack');
    expect(toast).toHaveAttribute('count', '3');
    expect(toast).toHaveAttribute('delay', '2500');
  });

  test('forwards refs to the web component host', () => {
    const ref = createRef();
    render(<CornToast ref={ref} />);

    expect(ref.current).toBeTruthy();
    expect(ref.current.tagName).toBe('CORN-TOAST');
  });

  test('forwards a callback ref and drops an attribute that is removed', () => {
    const ref = jest.fn();
    const { container, rerender } = render(<CornToast ref={ref} delay="2500" />);
    const toast = container.querySelector('corn-toast');

    expect(ref).toHaveBeenCalledWith(toast);
    expect(toast).toHaveAttribute('delay', '2500');

    rerender(<CornToast delay={undefined} />);
    expect(toast).not.toHaveAttribute('delay');
  });

  test('renders attributes in server markup', () => {
    const html = renderToString(<CornToast delay="2500" count="3" />);

    expect(html).toContain('delay="2500"');
    expect(html).toContain('count="3"');
  });
});
