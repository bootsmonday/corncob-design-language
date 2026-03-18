// Tabs Component JavaScript
export class CobTabs extends HTMLElement {
  connectedCallback() {
    this.buttons = Array.from(this.querySelectorAll('[role="tab"]'));
    this.panels = Array.from(this.querySelectorAll('[role="tabpanel"]'));

    this.buttons.forEach((button, index) => {
      button.addEventListener('click', () => this.selectTab(index));
      button.addEventListener('keydown', (e) => this.handleKeyDown(e, index));
    });
  }

  selectTab(index) {
    this.buttons.forEach((button, i) => {
      button.setAttribute('aria-selected', i === index);
      button.setAttribute('tabindex', i === index ? '0' : '-1');
    });

    this.panels.forEach((panel, i) => {
      panel.setAttribute('aria-hidden', i !== index);
    });
  }

  handleKeyDown(e, currentIndex) {
    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
        nextIndex = Math.max(0, currentIndex - 1);
        e.preventDefault();
        break;
      case 'ArrowRight':
        nextIndex = Math.min(this.buttons.length - 1, currentIndex + 1);
        e.preventDefault();
        break;
      case 'Home':
        nextIndex = 0;
        e.preventDefault();
        break;
      case 'End':
        nextIndex = this.buttons.length - 1;
        e.preventDefault();
        break;
      default:
        return;
    }

    this.selectTab(nextIndex);
    this.buttons[nextIndex].focus();
  }
}

customElements.define('cob-tabs', CobTabs);
