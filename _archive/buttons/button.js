// Button Component JavaScript
export class CobButton extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'type', 'loading'];
  }

  connectedCallback() {
    this.setAttribute('role', 'button');
    this.tabIndex = this.tabIndex < 0 || this.tabIndex === 0 ? 0 : -1;

    this.addEventListener('click', this.handleClick.bind(this));
    this.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled') {
      this.setAttribute('aria-disabled', newValue !== null);
      this.tabIndex = newValue !== null ? -1 : 0;
    } else if (name === 'loading') {
      this.setAttribute('aria-busy', newValue !== null);
    }
  }

  handleClick(e) {
    if (this.hasAttribute('disabled') || this.hasAttribute('loading')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  }

  setLoading(isLoading) {
    if (isLoading) {
      this.setAttribute('loading', '');
      this.classList.add('cob-button--loading');
    } else {
      this.removeAttribute('loading');
      this.classList.remove('cob-button--loading');
    }
  }
}

// Register custom element
customElements.define('cob-button', CobButton);
