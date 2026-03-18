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
});
