// Checkbox Component JavaScript
export class CobCheckbox extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector('input[type="checkbox"]');
    if (this.input) {
      this.input.addEventListener('change', () => this.handleChange());
    }
  }

  isChecked() {
    return this.input?.checked || false;
  }

  setChecked(checked) {
    if (this.input) {
      this.input.checked = checked;
    }
  }

  handleChange() {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.input.checked },
      })
    );
  }
}

customElements.define('cob-checkbox', CobCheckbox);
