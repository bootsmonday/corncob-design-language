// Modal Component JavaScript
export class CobModal extends HTMLElement {
  static get observedAttributes() {
    return ['open'];
  }

  connectedCallback() {
    this.backdrop = this.querySelector('.cob-modal-backdrop');
    this.closeButton = this.querySelector('.cob-modal__close');

    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.close());
    }

    if (this.backdrop) {
      this.backdrop.addEventListener('click', (e) => {
        if (e.target === this.backdrop) {
          this.close();
        }
      });
    }

    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  open() {
    if (this.backdrop) {
      this.backdrop.classList.add('--visible');
    }
    this.setAttribute('open', '');
    this.setAttribute('aria-modal', 'true');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (this.backdrop) {
      this.backdrop.classList.remove('--visible');
    }
    this.removeAttribute('open');
    this.setAttribute('aria-modal', 'false');
    document.body.style.overflow = '';
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' && this.hasAttribute('open')) {
      this.close();
    }
  }
}

customElements.define('cob-modal', CobModal);
