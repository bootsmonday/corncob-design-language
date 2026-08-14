import '../popovers/popover';
import './select';

describe('CornSelect form submission', () => {
  beforeAll(() => {
    if (!HTMLElement.prototype.attachInternals) {
      Object.defineProperty(HTMLElement.prototype, 'attachInternals', {
        configurable: true,
        value() {
          return {
            form: this.closest ? this.closest('form') : null,
            validity: {},
            validationMessage: '',
            willValidate: true,
            ariaDisabled: false,
            setFormValue: jest.fn(),
            setValidity: jest.fn(),
          };
        },
      });
    }
  });

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    document.body.innerHTML = '';
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  function buildForm({ name, multiple = false, values = [] }) {
    const form = document.createElement('form');
    const wrapper = document.createElement('div');
    wrapper.className = 'corn-select corn-select--md';
    const select = document.createElement('corn-select');

    select.setAttribute('name', name);
    if (multiple) select.setAttribute('multiple', '');

    values.forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });

    wrapper.appendChild(select);
    form.appendChild(wrapper);
    document.body.appendChild(form);

    const popover = document.createElement('corn-popover');
    popover._close = jest.fn();

    const checkboxes = values.map((value, index) => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = value;
      checkbox.checked = index === 0;
      popover.appendChild(checkbox);
      return checkbox;
    });

    select._popover = popover;
    select.appendChild(popover);

    return { form, select, checkboxes };
  }

  function getSubmittedValue(form, fieldName) {
    const formData = new FormData(form);

    if (!formData.has(fieldName)) {
      const customControl = form.querySelector(`corn-select[name="${fieldName}"]`);
      const value = customControl?.value;
      const isEmptyArray = Array.isArray(value) && value.length === 0;
      const isEmptyValue = value === null || value === undefined || value === '' || isEmptyArray;

      if (!isEmptyValue) {
        formData.append(fieldName, String(value));
      }
    }

    return formData.get(fieldName);
  }

  test('submits a single value when one option is checked', () => {
    const { form, select, checkboxes } = buildForm({
      name: 'flavor',
      values: ['vanilla', 'chocolate', 'strawberry'],
    });

    checkboxes[0].checked = false;
    const chocolate = checkboxes[1];
    chocolate.checked = true;

    select.handleEvent({
      type: 'click',
      target: chocolate,
      stopPropagation: jest.fn(),
    });

    expect(getSubmittedValue(form, 'flavor')).toBe('chocolate');
  });

  test('submits multiple checked values when multiple attribute is present', () => {
    const { form, select, checkboxes } = buildForm({
      name: 'colors',
      multiple: true,
      values: ['red', 'green', 'blue'],
    });

    const red = checkboxes[0];
    const green = checkboxes[1];
    const blue = checkboxes[2];

    red.checked = false;
    green.checked = true;
    blue.checked = true;

    select.handleEvent({
      type: 'click',
      target: green,
      stopPropagation: jest.fn(),
    });
    select.handleEvent({
      type: 'click',
      target: blue,
      stopPropagation: jest.fn(),
    });

    expect(getSubmittedValue(form, 'colors')).toBe('green, blue');
  });
});
