// Checkbox Component Tests
import { CobCheckbox } from './checkbox';
import '@/components/checkbox/checkbox.css';

describe('CobCheckbox', () => {
  let checkbox;

  beforeEach(() => {
    checkbox = new CobCheckbox();
    const input = document.createElement('input');
    input.type = 'checkbox';
    checkbox.appendChild(input);
    document.body.appendChild(checkbox);
  });

  afterEach(() => {
    document.body.removeChild(checkbox);
  });

  test('should check if checkbox is checked', () => {
    const input = checkbox.querySelector('input');
    input.checked = true;
    expect(checkbox.isChecked()).toBe(true);
  });

  test('should set checked state', () => {
    checkbox.setChecked(true);
    expect(checkbox.querySelector('input').checked).toBe(true);
  });

  test('should dispatch change event', () => {
    const changeHandler = jest.fn();
    checkbox.addEventListener('change', changeHandler);

    const input = checkbox.querySelector('input');
    input.click();

    expect(changeHandler).toHaveBeenCalled();
  });
});
