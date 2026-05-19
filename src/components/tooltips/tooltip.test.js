import { CornTooltip } from './tooltip';

describe('CornTooltip', () => {
  const createTooltipFixture = ({ position, labelledby } = {}) => {
    const anchor = document.createElement('div');
    anchor.className = 'corn-tooltip--anchor';

    if (labelledby) {
      anchor.setAttribute('aria-labelledby', labelledby);
    }

    const trigger = document.createElement('button');
    trigger.textContent = 'Hover for tooltip';

    const tooltip = new CornTooltip();
    tooltip.textContent = 'Tooltip text';

    if (position) {
      tooltip.setAttribute('position', position);
    }

    anchor.appendChild(trigger);
    anchor.appendChild(tooltip);
    document.body.appendChild(anchor);

    return {
      anchor,
      trigger,
      tooltip,
    };
  };

  let originalResizeObserver;
  let resizeObserverInstances;

  beforeEach(() => {
    resizeObserverInstances = [];
    originalResizeObserver = global.ResizeObserver;

    global.ResizeObserver = class MockResizeObserver {
      constructor(callback) {
        this.callback = callback;
        this.observe = jest.fn();
        this.unobserve = jest.fn();
        this.disconnect = jest.fn();
        resizeObserverInstances.push(this);
      }
    };
  });

  afterEach(() => {
    global.ResizeObserver = originalResizeObserver;
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  test('observes only the position attribute', () => {
    expect(CornTooltip.observedAttributes).toEqual(['position']);
  });

  test('defaults to top position when no attribute is provided', () => {
    const { tooltip } = createTooltipFixture();

    expect(tooltip.classList.contains('corn-tooltip--top')).toBe(true);
  });

  test('applies provided position attribute class', () => {
    const { tooltip } = createTooltipFixture({ position: 'left' });

    expect(tooltip.classList.contains('corn-tooltip--left')).toBe(true);
  });

  test('adds tooltip accessibility attributes and references parent label ids', () => {
    const { anchor, tooltip } = createTooltipFixture({ labelledby: 'external-label' });

    expect(tooltip.getAttribute('role')).toBe('tooltip');
    expect(tooltip.id).toMatch(/^corn-tooltip--/);

    const labelledBy = anchor.getAttribute('aria-labelledby').split(' ');
    expect(labelledBy).toContain('external-label');
    expect(labelledBy).toContain(tooltip.id);

    tooltip._addAccessiblity();
    const idOccurrences = anchor
      .getAttribute('aria-labelledby')
      .split(' ')
      .filter((id) => id === tooltip.id).length;
    expect(idOccurrences).toBe(1);
  });

  test('opens on mouseenter and closes on mouseleave', () => {
    const { anchor, tooltip } = createTooltipFixture();

    anchor.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    expect(resizeObserverInstances).toHaveLength(1);
    expect(resizeObserverInstances[0].observe).toHaveBeenCalledWith(tooltip.scrollEl);

    anchor.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    expect(resizeObserverInstances[0].unobserve).toHaveBeenCalledWith(tooltip.scrollEl);
    expect(resizeObserverInstances[0].disconnect).toHaveBeenCalled();
    expect(tooltip.resizeObserver).toBeNull();
  });

  test('removes tooltip id from parent aria-labelledby on disconnect', () => {
    const { anchor, tooltip } = createTooltipFixture({ labelledby: 'external-label' });

    const tooltipId = tooltip.id;
    anchor.removeChild(tooltip);

    const labelledBy = anchor.getAttribute('aria-labelledby');
    expect(labelledBy).toBe('external-label');
    expect(labelledBy).not.toContain(tooltipId);
  });

  test('finds a scrollable parent inside Shadow DOM', () => {
    const { anchor, tooltip, trigger } = createTooltipFixture();
    const host = document.createElement('div');
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const scrollContainer = document.createElement('div');

    scrollContainer.style.overflow = 'auto';
    anchor.appendChild(trigger);
    anchor.appendChild(tooltip);
    scrollContainer.appendChild(anchor);
    shadowRoot.appendChild(scrollContainer);
    document.body.appendChild(host);

    const scrollParent = tooltip._getScrollParent(tooltip);

    expect(scrollParent).toBe(scrollContainer);
    expect(scrollParent.nodeType).toBe(Node.ELEMENT_NODE);
    expect(scrollParent).not.toBe(shadowRoot);
  });

  test('traverses out of ShadowRoot and falls back to body when no scroll parent exists', () => {
    const { anchor, tooltip, trigger } = createTooltipFixture();
    const host = document.createElement('div');
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('section');

    anchor.appendChild(trigger);
    anchor.appendChild(tooltip);
    wrapper.appendChild(anchor);
    shadowRoot.appendChild(wrapper);
    document.body.appendChild(host);

    const scrollParent = tooltip._getScrollParent(tooltip);

    expect(scrollParent).toBe(document.body);
    expect(scrollParent.nodeType).toBe(Node.ELEMENT_NODE);
    expect(scrollParent).not.toBe(shadowRoot);
  });
});
