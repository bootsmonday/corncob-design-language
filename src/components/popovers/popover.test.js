import { CornPopover } from './popover';

describe('CornPopover', () => {
  const createPopoverFixture = ({ position } = {}) => {
    const anchor = document.createElement('div');
    anchor.className = 'corn-popover--anchor';

    const trigger = document.createElement('button');
    trigger.className = 'corn-pop';
    trigger.textContent = 'Open popover';

    const popover = new CornPopover();
    if (position) {
      popover.setAttribute('position', position);
    }

    const firstAction = document.createElement('button');
    firstAction.textContent = 'First action';

    const secondAction = document.createElement('button');
    secondAction.textContent = 'Second action';

    popover.appendChild(firstAction);
    popover.appendChild(secondAction);

    anchor.appendChild(trigger);
    anchor.appendChild(popover);
    document.body.appendChild(anchor);

    return {
      anchor,
      trigger,
      popover,
      firstAction,
      secondAction,
    };
  };

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  test('observes only the position attribute', () => {
    expect(CornPopover.observedAttributes).toEqual(['position']);
  });

  test('defaults to top position when no attribute is provided', () => {
    const { popover } = createPopoverFixture();

    expect(popover.classList.contains('corn-popover--top')).toBe(true);
  });

  test('applies provided position attribute class', () => {
    const { popover } = createPopoverFixture({ position: 'left' });

    expect(popover.classList.contains('corn-popover--left')).toBe(true);
  });

  test('opens and closes when clicking the trigger', () => {
    const { trigger, popover } = createPopoverFixture();

    trigger.click();
    expect(popover.isOpen).toBe(true);
    expect(popover.classList.contains('corn-popover--open')).toBe(true);

    trigger.click();
    expect(popover.isOpen).toBe(false);
    expect(popover.classList.contains('corn-popover--open')).toBe(false);
  });

  test('closes on Escape and returns focus to active element before opening', () => {
    const { trigger, popover } = createPopoverFixture();

    trigger.focus();
    trigger.click();

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    popover.dispatchEvent(escapeEvent);

    expect(popover.isOpen).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });

  test('traps Tab focus from last to first focusable element', () => {
    const { trigger, popover, firstAction, secondAction } = createPopoverFixture();

    trigger.click();
    secondAction.focus();

    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    });

    popover.dispatchEvent(tabEvent);

    expect(tabEvent.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(firstAction);
  });

  test('finds a scrollable parent inside Shadow DOM', () => {
    const host = document.createElement('div');
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const scrollContainer = document.createElement('div');
    const anchor = document.createElement('div');
    const trigger = document.createElement('button');
    const popover = new CornPopover();

    anchor.className = 'corn-popover--anchor';
    trigger.className = 'corn-pop';
    scrollContainer.style.overflow = 'auto';
    anchor.appendChild(trigger);
    anchor.appendChild(popover);
    scrollContainer.appendChild(anchor);
    shadowRoot.appendChild(scrollContainer);
    document.body.appendChild(host);

    const scrollParent = popover._getScrollParent(popover);

    expect(scrollParent).toBe(scrollContainer);
    expect(scrollParent.nodeType).toBe(Node.ELEMENT_NODE);
    expect(scrollParent).not.toBe(shadowRoot);
  });

  test('traverses out of ShadowRoot and falls back to body when no scroll parent exists', () => {
    const host = document.createElement('div');
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('section');
    const anchor = document.createElement('div');
    const trigger = document.createElement('button');
    const popover = new CornPopover();

    anchor.className = 'corn-popover--anchor';
    trigger.className = 'corn-pop';
    anchor.appendChild(trigger);
    anchor.appendChild(popover);
    wrapper.appendChild(anchor);
    shadowRoot.appendChild(wrapper);
    document.body.appendChild(host);

    const scrollParent = popover._getScrollParent(popover);

    expect(scrollParent).toBe(document.body);
    expect(scrollParent.nodeType).toBe(Node.ELEMENT_NODE);
    expect(scrollParent).not.toBe(shadowRoot);
  });
});
