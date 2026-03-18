// Card Component JavaScript
export class CobCard extends HTMLElement {
  // Cards are primarily CSS-based, JS provides optional enhancements
  connectedCallback() {
    // Could add interactive features here
  }
}

customElements.define('cob-card', CobCard);
