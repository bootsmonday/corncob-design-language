import { createRef } from 'react';
import { render } from '@testing-library/react';
import { CornButtonBar } from './button-bar.jsx';

describe('CornButtonBar', () => {
  test('renders corn-button-bar host with base class', () => {
    const { container } = render(
      <CornButtonBar>
        <button className="corn-button" type="button">
          One
        </button>
      </CornButtonBar>
    );

    const host = container.querySelector('corn-button-bar');
    expect(host).toBeTruthy();
    expect(host).toHaveClass('corn-button-bar');
  });

  test('passes overflow label attribute to web component', () => {
    const { container } = render(
      <CornButtonBar overflowLabel="More">
        <button className="corn-button" type="button">
          One
        </button>
      </CornButtonBar>
    );

    expect(container.querySelector('corn-button-bar')).toHaveAttribute('overflow-label', 'More');
  });

  test('forwards ref to corn-button-bar host', () => {
    const ref = createRef();
    render(
      <CornButtonBar ref={ref}>
        <button className="corn-button" type="button">
          One
        </button>
      </CornButtonBar>
    );

    expect(ref.current.tagName).toBe('CORN-BUTTON-BAR');
  });
});
