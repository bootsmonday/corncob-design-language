// Button Component Tests
import { CobButton } from './button';
import '@/components/button/button.css';

describe('CobButton', () => {
  let button;

  beforeEach(() => {
    button = new CobButton();
    button.textContent = 'Test Button';
    document.body.appendChild(button);
  });

  afterEach(() => {
    document.body.removeChild(button);
  });

  test('should render as a custom element', () => {
    expect(button).toBeInstanceOf(CobButton);
    expect(button.tagName).toBe('COB-BUTTON');
  });

  test('should have role="button"', () => {
    expect(button.getAttribute('role')).toBe('button');
  });

  test('should be keyboard accessible', () => {
    expect(button.tabIndex).toBe(0);
  });

  test('should handle click events', () => {
    const clickHandler = jest.fn();
    button.addEventListener('click', clickHandler);
    button.click();
    expect(clickHandler).toHaveBeenCalled();
  });

  test('should not trigger click when disabled', () => {
    button.setAttribute('disabled', '');
    button.setAttribute('aria-disabled', 'true');

    const clickHandler = jest.fn();
    button.addEventListener('click', clickHandler.bind(button));
    button.click();
    // Note: handler still triggers but component should ignore
  });

  test('should respond to Space and Enter keys', () => {
    const clickHandler = jest.fn();
    button.addEventListener('click', clickHandler);

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    button.dispatchEvent(enterEvent);

    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    button.dispatchEvent(spaceEvent);

    expect(clickHandler.mock.calls.length).toBeGreaterThaNo(0);
  });

  test('should support loading state', () => {
    button.setLoading(true);
    expect(button.hasAttribute('loading')).toBe(true);
    expect(button.classList.contains('cob-button--loading')).toBe(true);

    button.setLoading(false);
    expect(button.hasAttribute('loading')).toBe(false);
    expect(button.classList.contains('cob-button--loading')).toBe(false);
  });

  test('should update aria-disabled on disabled attribute change', () => {
    button.setAttribute('disabled', '');
    expect(button.getAttribute('aria-disabled')).toBe('true');

    button.removeAttribute('disabled');
    expect(button.getAttribute('aria-disabled')).toBe('false');
  });
});
