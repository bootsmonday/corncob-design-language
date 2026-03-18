// Input Component JavaScript
export class CobInput extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'invalid', 'value'];
  }

  connectedCallback() {
    this.input = this.querySelector('input');
    if (this.input) {
      this.input.addEventListener('input', () => this.handleInput());
      this.input.addEventListener('blur', () => this.validate());
    }
  }

  getValue() {
    return this.input?.value || '';
  }

  setValue(value) {
    if (this.input) {
      this.input.value = value;
    }
  }

  setError(message) {
    this.classList.add('cob-input--error');
    let error = this.querySelector('.cob-error');
    if (!error) {
      error = document.createElement('div');
      error.className = 'cob-error';
      this.appendChild(error);
    }
    error.textContent = message;
  }

  clearError() {
    this.classList.remove('cob-input--error');
    const error = this.querySelector('.cob-error');
    if (error) {
      error.remove();
    }
  }

  validate() {
    if (this.input?.required && !this.input.value) {
      this.setError('This field is required');
      return false;
    }
    this.clearError();
    return true;
  }

  handleInput() {
    this.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

customElements.define('cob-input', CobInput);
