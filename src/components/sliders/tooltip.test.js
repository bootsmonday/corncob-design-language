// Tooltip Component Tests
import { CobTooltip } from './tooltip';
import '@/components/tooltip/tooltip.css';

describe('CobTooltip', () => {
  let tooltip;

  beforeEach(() => {
    tooltip = new CobTooltip();
    const button = document.createElement('button');
    button.textContent = 'Hover';
    const text = document.createElement('span');
    text.className = 'cob-tooltip-text';
    text.textContent = 'Tooltip text';
    tooltip.appendChild(button);
    tooltip.appendChild(text);
    document.body.appendChild(tooltip);
  });

  afterEach(() => {
    document.body.removeChild(tooltip);
  });

  test('should render tooltip element', () => {
    expect(tooltip.querySelector('.cob-tooltip-text')).toBeTruthy();
  });

  test('should have tooltip text', () => {
    const text = tooltip.querySelector('.cob-tooltip-text');
    expect(text.textContent).toBe('Tooltip text');
  });
});
