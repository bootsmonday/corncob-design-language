import { createRef } from 'react';
import { render } from '@testing-library/react';
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
});
