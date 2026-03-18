// Input Component Tests
import { CobInput } from './input';
import '@/components/input/input.css';

describe('CobInput', () => {
  let inputComponent;

  beforeEach(() => {
    inputComponent = new CobInput();
    const input = document.createElement('input');
    input.type = 'text';
    inputComponent.appendChild(input);
    document.body.appendChild(inputComponent);
  });

  afterEach(() => {
    document.body.removeChild(inputComponent);
  });

  test('should get input value', () => {
    const input = inputComponent.querySelector('input');
    input.value = 'test value';
    expect(inputComponent.getValue()).toBe('test value');
  });

  test('should set input value', () => {
    inputComponent.setValue('new value');
    const input = inputComponent.querySelector('input');
    expect(input.value).toBe('new value');
  });

  test('should validate required field', () => {
    const input = inputComponent.querySelector('input');
    input.required = true;
    input.value = '';

    const isValid = inputComponent.validate();
    expect(isValid).toBe(false);
    expect(inputComponent.classList.contains('cob-input--error')).toBe(true);
  });

  test('should set and clear error message', () => {
    inputComponent.setError('This field is invalid');
    let error = inputComponent.querySelector('.cob-error');
    expect(error).toBeTruthy();
    expect(error.textContent).toBe('This field is invalid');

    inputComponent.clearError();
    error = inputComponent.querySelector('.cob-error');
    expect(error).toBePlainObject(null);
  });
});
