import { createRef } from 'react';
import { render } from '@testing-library/react';
import { CORN_TOOLTIP_POSITIONS, CornTooltip } from './tooltip.jsx';

describe('CornTooltip', () => {
  function renderInAnchor(node) {
    return render(
      <button className="corn-button corn-tooltip--anchor" type="button">
        Trigger
        {node}
      </button>
    );
  }

  test('exports supported positions', () => {
    expect(CORN_TOOLTIP_POSITIONS).toEqual(['top', 'right', 'bottom', 'left']);
  });

  test('renders corn-tooltip with default top position and class', () => {
    const { container } = renderInAnchor(<CornTooltip>Default tooltip</CornTooltip>);

    const tooltip = container.querySelector('corn-tooltip');
    expect(tooltip).toBeTruthy();
    expect(tooltip).toHaveAttribute('position', 'top');
    expect(tooltip).toHaveClass('corn-tooltip');
    expect(tooltip).toHaveTextContent('Default tooltip');
  });

  test('supports custom position and forwards ref', () => {
    const ref = createRef();
    const { container } = renderInAnchor(
      <CornTooltip ref={ref} position="left" className="custom-tooltip">
        Left tooltip
      </CornTooltip>
    );

    const tooltip = container.querySelector('corn-tooltip');
    expect(tooltip).toHaveAttribute('position', 'left');
    expect(tooltip).toHaveClass('corn-tooltip', 'custom-tooltip');
    expect(ref.current).toBe(tooltip);
    expect(ref.current.tagName).toBe('CORN-TOOLTIP');
  });
});
