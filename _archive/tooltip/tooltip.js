// Tooltip Component JavaScript
export class CobTooltip extends HTMLElement {
  // Tooltips are primarily CSS-based with optional JS enhancements
  connectedCallback() {
    const trigger = this.querySelector('[role="tooltip"]');
    if (trigger) {
      trigger.setAttribute('aria-label', trigger.textContent);
    }
  }
}

customElements.define('cob-tooltip', CobTooltip);
