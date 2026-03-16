// Select Component JavaScript
export class CobSelect extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.selectedValue = null;
  }

  connectedCallback() {
    this.trigger = this.querySelector('[role="button"]');
    this.menu = this.querySelector('.cob-select-menu');
    this.options = Array.from(this.querySelectorAll('[role="option"]'));

    if (!this.trigger) {
      this.createTrigger();
    }

    this.trigger?.addEventListener('click', () => this.toggle());
    this.trigger?.addEventListener('keydown', (e) => this.handleKeyDown(e));

    this.options.forEach((option) => {
      option.addEventListener('click', () => this.selectOption(option));
    });

    document.addEventListener('click', (e) => this.handleClickOutside(e));
  }

  createTrigger() {
    const trigger = document.createElement('button');
    trigger.className = 'cob-select-trigger';
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('aria-haspopup', 'listbox');

    const text = document.createElement('span');
    text.textContent = this.selectedValue || 'Select an option';

    const arrow = document.createElement('span');
    arrow.className = 'cob-select-trigger__arrow';
    arrow.textContent = '▼';

    trigger.appendChild(text);
    trigger.appendChild(arrow);
    this.insertBefore(trigger, this.querySelector('.cob-select-menu'));
    this.trigger = trigger;
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.classList.add('cob-select--open');
    this.trigger?.classList.add('cob-select-trigger--open');
  }

  close() {
    this.isOpen = false;
    this.classList.remove('cob-select--open');
    this.trigger?.classList.remove('cob-select-trigger--open');
  }

  selectOption(option) {
    this.options.forEach((o) => o.classList.remove('cob-select-option--selected'));
    option.classList.add('cob-select-option--selected');

    this.selectedValue = option.textContent;
    if (this.trigger) {
      const text = this.trigger.querySelector('span');
      if (text) text.textContent = this.selectedValue;
    }

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: option.getAttribute('value') },
      })
    );

    this.close();
  }

  handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggle();
    } else if (e.key === 'ArrowDown') {
      this.open();
    } else if (e.key === 'Escape') {
      this.close();
    }
  }

  handleClickOutside(e) {
    if (!this.contains(e.target)) {
      this.close();
    }
  }
}

customElements.define('cob-select', CobSelect);
