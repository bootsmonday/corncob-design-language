// Toggle Component Tests
import { CobToggle } from './toggle';
import '@/components/toggle/toggle.css';

describe('CobToggle', () => {
  let toggle;

  beforeEach(() => {
    toggle = new CobToggle();
    const input = document.createElement('input');
    input.type = 'checkbox';
    toggle.appendChild(input);
    document.body.appendChild(toggle);
  });

  afterEach(() => {
    document.body.removeChild(toggle);
  });

  test('should check if toggle is on', () => {
    toggle.toggle(true);
    expect(toggle.isOn()).toBe(true);
  });

  test('should toggle state', () => {
    toggle.toggle(true);
    expect(toggle.querySelector('input').checked).toBe(true);

    toggle.toggle(false);
    expect(toggle.querySelector('input').checked).toBe(false);
  });

  test('should dispatch toggle event', () => {
    const toggleHandler = jest.fn();
    toggle.addEventListener('toggle', toggleHandler);

    toggle.toggle(true);

    expect(toggleHandler).toHaveBeenCalled();
  });
});
