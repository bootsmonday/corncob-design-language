// Toggle Component JavaScript
export class CobToggle extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector('input[type="checkbox"]');
    if (this.input) {
      this.input.addEventListener('change', () => this.handleChange());
    }
  }

  isOn() {
    return this.input?.checked || false;
  }

  toggle(on) {
    if (this.input) {
      this.input.checked = on;
      this.handleChange();
    }
  }

  handleChange() {
    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: { on: this.input.checked },
      })
    );
  }
}

customElements.define('cob-toggle', CobToggle);
