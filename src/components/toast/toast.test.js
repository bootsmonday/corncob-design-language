import './toast';
import './toast.css';

describe('CornToast', () => {
  let toast;

  beforeAll(() => {
    HTMLElement.prototype.showPopover = jest.fn();
    HTMLElement.prototype.hidePopover = jest.fn();
  });

  beforeEach(() => {
    document.body.innerHTML = '';
    toast = document.createElement('corn-toast');
    document.body.appendChild(toast);
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('renders toast list on connect', () => {
    expect(toast.querySelector('dialog')).toBeNull();
    expect(toast.querySelector('ul')).toBeTruthy();
    expect(toast.querySelector('ul').getAttribute('aria-live')).toBe('polite');
    expect(HTMLElement.prototype.showPopover).not.toHaveBeenCalled();
  });

  test('adds a toast message to the list and calls showPopover', () => {
    toast.addToast({ text: 'Toast saved' });

    const items = toast.querySelectorAll('li');

    expect(items).toHaveLength(1);
    expect(items[0].textContent).toContain('Toast saved');
    expect(HTMLElement.prototype.showPopover).toHaveBeenCalled();
  });

  test('accepts a DOM element as the icon', () => {
    const icon = document.createElement('i');
    icon.className = 'bi bi-info-circle';

    toast.addToast({ text: 'Toast with icon', icon });

    const renderedIcon = toast.querySelector('.corn-toast--status i');

    expect(renderedIcon).toBeTruthy();
    expect(renderedIcon).not.toBe(icon);
    expect(renderedIcon.className).toBe('bi bi-info-circle');
  });

  test('sanitizes string icons before rendering', () => {
    toast.addToast({
      text: 'Toast with sanitized icon',
      icon: '<img src="/icon.svg" onerror="alert(1)">',
    });

    const renderedIcon = toast.querySelector('.corn-toast--status img');

    expect(renderedIcon).toBeTruthy();
    expect(renderedIcon.getAttribute('src')).toBe('/icon.svg');
    expect(renderedIcon.hasAttribute('onerror')).toBe(false);
  });

  test('rejects unsupported root tags for icons', () => {
    toast.addToast({
      text: 'Toast without rendered icon',
      icon: '<div class="not-supported"></div>',
    });

    expect(toast.querySelector('.corn-toast--status')).toBeNull();
  });
});
