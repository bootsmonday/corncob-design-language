import CornPopoverStyles from '../popovers/popover.css?inline'; // only needed if corn-popover still uses shadow
import CornSelectStyles from './select.css?inline';

export class CornSelect extends HTMLElement {
  static formAssociated = true;

  #internals;
  #value = [];
  #observer = null;
  #isRendering = false;
  #list = null; // the generated checkbox list container

  constructor() {
    super();
    this.#internals = this.attachInternals();

    // unique id for this instance
    this.uuid = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).slice(2, 11);
    if (!this.id) this.id = `corn-select-${this.uuid}`;

    // ARIA
    this.setAttribute('role', 'combobox');
    this.setAttribute('aria-haspopup', 'listbox');
    this.setAttribute('aria-expanded', 'false');
    this.setAttribute('tabindex', '0');

    this.classList.add('corn-popover--anchor');
  }

  static get observedAttributes() {
    return ['name', 'placeholder', 'disabled', 'required', 'size', 'value'];
  }

  connectedCallback() {
    this.#upgradeSize();
    this.#render();
    this.#addEventListeners();

    // Watch light-DOM <option> changes
    this.#observer = new MutationObserver(() => {
      console.log('MutationObserver triggered for <corn-select> light DOM changes');
      if (this.#isRendering) return;
      this.#render();
    });

    this.#observer.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['value', 'disabled', 'selected', 'label'],
    });
  }

  disconnectedCallback() {
    this.#observer?.disconnect();
    this.#removeEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === 'size') {
      this.#upgradeSize();
      this.#render();
    }

    if (name === 'disabled') {
      this.#internals.ariaDisabled = newValue !== null ? 'true' : null;
      this.#render();
    }

    if (name === 'value') {
      this.value = newValue;
    }

    if (name === 'required' || name === 'name' || name === 'placeholder') {
      this.#render();
    }
  }

  // ------------------------------------------------------------------
  // Public API
  // ------------------------------------------------------------------
  get options() {
    return [...this.querySelectorAll(':scope > option')];
  }

  get value() {
    return this.#value;
  }

  set value(v) {
    const values = Array.isArray(v) ? v : v == null || v === '' ? [] : [String(v)];
    this.#value = values;

    // keep the original <option>s in sync
    this.options.forEach((opt) => {
      opt.selected = values.includes(opt.value);
    });

    this.#internals.setFormValue(values.length ? values : null);
    this.#updateValidity();
    this.#render(); // refresh checked state
  }

  get name() {
    return this.getAttribute('name');
  }

  get form() {
    return this.#internals.form;
  }

  get type() {
    return this.localName;
  }

  get validity() {
    return this.#internals.validity;
  }

  get validationMessage() {
    return this.#internals.validationMessage;
  }

  get willValidate() {
    return this.#internals.willValidate;
  }

  // ------------------------------------------------------------------
  // Rendering (Light DOM)
  // ------------------------------------------------------------------
  #upgradeSize() {
    // Prefer explicit size attribute, otherwise fall back to class / id pattern
    const sizeFromAttr = this.getAttribute('size');
    const sizeFromClass = Array.from(this.classList)
      .find((c) => /--(xs|sm|md|lg|xl)$/.test(c))
      ?.match(/--(xs|sm|md|lg|xl)$/)?.[1];
    const sizeFromId = this.id?.match(/--(xs|sm|md|lg|xl)/)?.[1];

    this.dataset.size = sizeFromAttr || sizeFromClass || sizeFromId || 'md';
  }

  #render() {
    console.log('Rendering <corn-select> light DOM checkboxes');
    this.#isRendering = true;

    // 1. Hide the original <option>s so they don’t show as text
    this.options.forEach((opt) => {
      opt.hidden = true;
    });

    // 2. Ensure we have a list container in the light DOM
    if (!this.#list) {
      this.#list = document.createElement('div');
      this.#list.className = 'corn-select-list';
      this.#list.setAttribute('role', 'listbox');
      this.append(this.#list);
    }

    // Optional: use a corn-popover if you still want the dropdown behavior
    // (assumes corn-popover can accept light-DOM content or you project into it)
    // For pure light DOM you can also just toggle visibility of this.#list.

    // 3. Clear previous checkboxes
    this.#list.replaceChildren();

    const name = this.getAttribute('name') || this.id;
    const sizeModifier = `corn-checkbox--${this.dataset.size}`;
    const hostDisabled = this.hasAttribute('disabled');
    const placeholder = this.getAttribute('placeholder');

    // Optional legend / placeholder
    if (placeholder) {
      const legend = document.createElement('div');
      legend.className = 'corn-select-placeholder';
      legend.textContent = placeholder;
      this.#list.append(legend);
    }

    // 4. Build checkboxes from the live <option>s
    this.options.forEach((opt, index) => {
      const id = `${this.id}-${index}`;

      const wrapper = document.createElement('div');
      wrapper.className = `corn-checkbox ${sizeModifier}`;
      if (opt.disabled || hostDisabled) wrapper.classList.add('is-disabled');

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.id = id;
      input.name = name;
      input.value = opt.value;
      input.checked = opt.selected;
      input.disabled = opt.disabled || hostDisabled;

      const label = document.createElement('label');
      label.htmlFor = id;
      label.textContent = opt.label || opt.textContent.trim();

      // Keep the original option in sync
      input.addEventListener('change', () => {
        opt.selected = input.checked;

        // update internal value
        const selected = this.options.filter((o) => o.selected).map((o) => o.value);

        this.#value = selected;
        this.#internals.setFormValue(selected.length ? selected : null);
        this.#updateValidity();

        this.dispatchEvent(new Event('change', { bubbles: true }));
        this.dispatchEvent(new Event('input', { bubbles: true }));
      });

      wrapper.append(input, label);
      this.#list.append(wrapper);
    });

    this.#isRendering = false;
  }

  // ------------------------------------------------------------------
  // Events & keyboard
  // ------------------------------------------------------------------
  #addEventListeners() {
    this.addEventListener('keydown', this);
    this.addEventListener('click', this);
  }

  #removeEventListeners() {
    this.removeEventListener('keydown', this);
    this.removeEventListener('click', this);
  }

  handleEvent(evt) {
    switch (evt.type) {
      case 'click':
        // open / close logic – wire to your corn-popover if still used
        break;
      case 'keydown':
        this.#trapFocus(evt);
        break;
    }
  }

  #getAllListOptions() {
    return Array.from(this.#list?.querySelectorAll('input[type="checkbox"]') || []);
  }

  #trapFocus(evt) {
    if (evt.key === ' ' || evt.key === 'Enter') {
      evt.preventDefault();
      // toggle open state or toggle focused checkbox
      const active = document.activeElement;
      if (active?.type === 'checkbox') {
        active.checked = !active.checked;
        active.dispatchEvent(new Event('change', { bubbles: true }));
      }
      return;
    }

    if (evt.key !== 'ArrowDown' && evt.key !== 'ArrowUp') return;

    const options = this.#getAllListOptions();
    if (!options.length) return;

    evt.preventDefault();
    const current = options.indexOf(document.activeElement);
    let next;

    if (evt.key === 'ArrowDown') {
      next = current === -1 || current === options.length - 1 ? 0 : current + 1;
    } else {
      next = current <= 0 ? options.length - 1 : current - 1;
    }

    options[next].focus();
  }

  // ------------------------------------------------------------------
  // Form validation
  // ------------------------------------------------------------------
  #updateValidity() {
    const required = this.hasAttribute('required');
    const empty = !this.#value || this.#value.length === 0;

    if (required && empty) {
      this.#internals.setValidity({ valueMissing: true }, 'Please select at least one option');
    } else {
      this.#internals.setValidity({});
    }
  }
}

customElements.define('corn-select', CornSelect);
