export class CornToast extends HTMLElement {
  static get observedAttributes() {
    return ['position'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'position') this._position = newValue;
    this.classList.add('corn-toast--' + this._position);
  }

  connectedCallback() {
    this.parent = this.closest('.corn-toast--anchor');
    if (!this.parent) return;
    if (!this._position) this._position = 'top';
    this.classPrefix = 'corn-toast--';
    this.classList.add(this.classPrefix + this._position);
    this._cacheElements();
    this._addEventListeners();
    this._addAccessiblity();
  }
  _addAccessiblity() {
    this.setAttribute('role', 'tooltip');
    if (!this.id) this.id = 'corn-toast--' + crypto.randomUUID().substring(0, 8);
    // Sets don't allow duplicates
    const parentLabelledby = new Set(
      (this.parent.getAttribute('aria-labelledby') || '').split(' ')
    );
    parentLabelledby.add(this.id);
    this.parent.setAttribute('aria-labelledby', [...parentLabelledby].join(' ').trim());
  }
  _addEventListeners() {
    this._showTooltip = () => this._open();
    this._hideTooltip = () => this._close();
    // Hover listeners
    this.parent.addEventListener('mouseenter', this._showTooltip);
    this.parent.addEventListener('mouseleave', this._hideTooltip);

    // Focus listeners (handles tab navigation)
    this.parent.addEventListener('focusin', this._showTooltip);
    this.parent.addEventListener('focusout', this._hideTooltip);
  }
  _removeEventListeners() {
    this.parent.removeEventListener('mouseenter', this._showTooltip);
    this.parent.removeEventListener('mouseleave', this._hideTooltip);

    // Focus listeners (handles tab navigation)
    this.parent.removeEventListener('focusin', this._showTooltip);
    this.parent.removeEventListener('focusout', this._hideTooltip);
  }

  _toggle(isActive) {
    if (isActive) {
      this._open();
    } else {
      this._close();
    }
  }

  _cacheElements() {
    this.observerOptions = {
      root: document.documentElement,
      rootMargin: '0px',
      threshold: 1.0,
    };
  }

  _resizeObserverCallback(entries) {
    if (!entries || entries.length === 0) {
      return;
    }
    this._positionContent();
  }

  _open() {
    if (this.overlapClass) {
      this.classList.remove(this.overlapClass);
      this.classList.add(this.classPrefix + this._position);
    }
    this.resizeObserver = new ResizeObserver((entries) => this._resizeObserverCallback(entries));
    this.resizeObserver.observe(this.scrollEl);
  }

  _close() {
    if (this.resizeObserver && this.scrollEl) {
      this.resizeObserver.unobserve(this.scrollEl);
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  /**
   * TODO need to check if we added the ID or if it was generated, if it was generated we can remove it, but if it was added by the user we should probably leave it
   */
  disconnectedCallback() {
    if (this.resizeObserver && this.scrollEl) {
      this.resizeObserver.unobserve(this.scrollEl);
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this._removeEventListeners();
    const parentLabelledby = new Set(
      (this.parent.getAttribute('aria-labelledby') || '').split(' ')
    );
    parentLabelledby.delete(this.id);
    if (parentLabelledby.size === 0) {
      this.parent.removeAttribute('aria-labelledby');
    } else {
      this.parent.setAttribute('aria-labelledby', [...parentLabelledby].join(' ').trim());
    }
  }
}
customElements.define('corn-toast', CornToast);
