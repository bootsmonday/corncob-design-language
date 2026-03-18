// Select Component Tests
import { CobSelect } from './select';
import '@/components/select/select.css';

describe('CobSelect', () => {
  let select;

  beforeEach(() => {
    select = new CobSelect();
    const trigger = document.createElement('button');
    trigger.className = 'cob-select-trigger';
    trigger.setAttribute('role', 'button');
    trigger.textContent = 'Select...';

    const menu = document.createElement('div');
    menu.className = 'cob-select-menu';

    for (let i = 1; i <= 3; i++) {
      const option = document.createElement('div');
      option.className = 'cob-select-option';
      option.setAttribute('role', 'option');
      option.setAttribute('value', i);
      option.textContent = `Option ${i}`;
      menu.appendChild(option);
    }

    select.appendChild(trigger);
    select.appendChild(menu);
    document.body.appendChild(select);
  });

  afterEach(() => {
    document.body.removeChild(select);
  });

  test('should toggle menu open/close', () => {
    select.open();
    expect(select.classList.contains('cob-select--open')).toBe(true);

    select.close();
    expect(select.classList.contains('cob-select--open')).toBe(false);
  });

  test('should select an option', () => {
    const option = select.querySelector('[role="option"]');
    select.selectOption(option);

    expect(option.classList.contains('cob-select-option--selected')).toBe(true);
    expect(select.selectedValue).toBe('Option 1');
  });

  test('should dispatch change event on selection', () => {
    const changeHandler = jest.fn();
    select.addEventListener('change', changeHandler);

    const option = select.querySelector('[role="option"]');
    select.selectOption(option);

    expect(changeHandler).toHaveBeenCalled();
  });
});
