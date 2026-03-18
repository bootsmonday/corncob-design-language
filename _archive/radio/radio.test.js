// Radio Component Tests
import { CobRadio } from './radio';
import '@/components/radio/radio.css';

describe('CobRadio', () => {
  let radio;

  beforeEach(() => {
    radio = new CobRadio();
    const input = document.createElement('input');
    input.type = 'radio';
    radio.appendChild(input);
    document.body.appendChild(radio);
  });

  afterEach(() => {
    document.body.removeChild(radio);
  });

  test('should check if radio is checked', () => {
    const input = radio.querySelector('input');
    input.checked = true;
    expect(radio.isChecked()).toBe(true);
  });

  test('should set checked state', () => {
    radio.setChecked(true);
    expect(radio.querySelector('input').checked).toBe(true);
  });

  test('should dispatch change event', () => {
    const changeHandler = jest.fn();
    radio.addEventListener('change', changeHandler);

    const input = radio.querySelector('input');
    input.click();

    expect(changeHandler).toHaveBeenCalled();
  });
});
