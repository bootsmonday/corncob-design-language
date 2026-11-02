// Guard against environments where HTMLElement is not defined (e.g., server-side rendering)
const CornHTMLElement = globalThis.HTMLElement ?? class {};

export class CornSlider extends CornHTMLElement {
  static get observedAttributes() {
    return ['position'];
  }
  attributeChangedCallback(name, oldValue, newValue) {}

  connectedCallback() {
    this._cacheElements();
    this._addEventListeners();
    this._addAccessiblity();
  }
  _addAccessiblity() {}
  _addEventListeners() {}
  _removeEventListeners() {}

  _cacheElements() {}

  /**
   * TODO need to check if we added the ID or if it was generated, if it was generated we can remove it, but if it was added by the user we should probably leave it
   */
  disconnectedCallback() {}
}
customElements.define('corn-slider', CornSlider);
