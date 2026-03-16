// Alert Component Tests
import { CobAlert } from './alert';
import '@/components/alert/alert.css';

describe('CobAlert', () => {
  let alert;

  beforeEach(() => {
    alert = new CobAlert();
    const content = document.createElement('div');
    content.className = 'cob-alert__content';
    content.textContent = 'Test alert';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'cob-alert__close';
    closeBtn.textContent = '✕';
    alert.appendChild(content);
    alert.appendChild(closeBtn);
    document.body.appendChild(alert);
  });

  afterEach(() => {
    document.body.removeChild(alert);
  });

  test('should dismiss alert', () => {
    alert.dismiss();
    expect(alert.classList.contains('cob-alert--hidden')).toBe(true);
  });

  test('should dispatch dismiss event', () => {
    const dismissHandler = jest.fn();
    alert.addEventListener('dismiss', dismissHandler);
    alert.dismiss();
    expect(dismissHandler).toHaveBeenCalled();
  });

  test('should show alert', () => {
    alert.classList.add('cob-alert--hidden');
    alert.show();
    expect(alert.classList.contains('cob-alert--hidden')).toBe(false);
  });
});
