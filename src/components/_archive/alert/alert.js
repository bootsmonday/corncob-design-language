// Alert Component JavaScript
export class CobAlert extends HTMLElement {
  connectedCallback() {
    this.closeButton = this.querySelector('.cob-alert__close');
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.dismiss());
    }

    if (this.hasAttribute('auto-dismiss')) {
      const delay = this.getAttribute('auto-dismiss-delay') || 5000;
      setTimeout(() => this.dismiss(), delay);
    }
  }

  dismiss() {
    this.classList.add('cob-alert--hidden');
    this.dispatchEvent(new CustomEvent('dismiss'));
  }

  show() {
    this.classList.remove('cob-alert--hidden');
  }
}

customElements.define('cob-alert', CobAlert);
