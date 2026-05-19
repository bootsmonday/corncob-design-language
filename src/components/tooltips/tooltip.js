export class CornTooltip extends HTMLElement {
  static get observedAttributes() {
    return ['position'];
  }

  /**
   * observedAttributes is a static getter that returns an array of attribute names to monitor for changes.
   * When any of these attributes change, the attributeChangedCallback method is called.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'position') this._position = newValue;
    this.classList.add('corn-tooltip--' + this._position);
  }

  /*
   * connectedCallback is called when the element is added to the DOM.
   * This is where we set up our event listeners and any initial state.
   */
  connectedCallback() {
    this.parent = this.closest('.corn-tooltip--anchor');
    if (!this.parent) return;
    if (!this._position) this._position = 'top';
    this.classPrefix = 'corn-tooltip--';
    this.classList.add(this.classPrefix + this._position);
    this._cacheElements();
    this._addEventListeners();
    this._addAccessiblity();
  }

  /*
   * _addAccessibility is a helper method to set the appropriate ARIA attributes for accessibility.
   * It ensures that the tooltip is properly associated with its trigger element for screen readers.
   */
  _addAccessiblity() {
    this.setAttribute('role', 'tooltip');
    if (!this.id) this.id = 'corn-tooltip--' + crypto.randomUUID().substring(0, 8);
    // Sets don't allow duplicates
    const parentLabelledby = new Set((this.parent.getAttribute('aria-labelledby') || '').split(' '));
    parentLabelledby.add(this.id);
    this.parent.setAttribute('aria-labelledby', [...parentLabelledby].join(' ').trim());
  }

  /*
   * handleEvent is a method that handles various events based on their type.
   * It listens for mouseenter, focusin, mouseleave, and focusout events to control the opening and closing of the tooltip.
   */
  handleEvent(evt) {
    switch (evt.type) {
      case 'mouseenter':
      case 'focusin':
        this._open();
        break;
      case 'mouseleave':
      case 'focusout':
        this._close();
        break;
    }
  }

  /*
   * _addEventListeners and _removeEventListeners are helper methods to manage event listeners for the tooltip.
   * They ensure that the appropriate events are listened to when the tooltip is connected and removed when it is disconnected.
   */
  _addEventListeners() {
    this._showTooltip = () => this._open();
    this._hideTooltip = () => this._close();
    // Hover listeners
    this.parent.addEventListener('mouseenter', this);
    this.parent.addEventListener('mouseleave', this);

    // Focus listeners (handles tab navigation)
    this.parent.addEventListener('focusin', this);
    this.parent.addEventListener('focusout', this);
  }

  /*
   * _removeEventListeners is a helper method to remove event listeners when the tooltip is disconnected from the DOM.
   * It ensures that there are no memory leaks or unintended behavior when the tooltip is removed.
   */
  _removeEventListeners() {
    this.parent.removeEventListener('mouseenter', this);
    this.parent.removeEventListener('mouseleave', this);

    // Focus listeners (handles tab navigation)
    this.parent.removeEventListener('focusin', this);
    this.parent.removeEventListener('focusout', this);
  }

  /*
   * _toggle is a method that toggles the tooltip's visibility based on the provided isActive parameter.
   * It calls the appropriate methods to open or close the tooltip accordingly.
   */
  _toggle(isActive) {
    if (isActive) {
      this._open();
    } else {
      this._close();
    }
  }

  /*
   * _getScrollParent is a helper method that finds the nearest scrollable parent element.
   * It traverses up the DOM tree to find an element that can scroll, which is necessary for positioning the tooltip correctly.
   */
  _getScrollParent(node) {
    if (!node) return document.body;

    // If we hit a ShadowRoot (DocumentFragment), continue from its host.
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      return node.host ? this._getScrollParent(node.host) : document.body;
    }

    if (node.nodeType === Node.DOCUMENT_NODE) return document.body;

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return this._getScrollParent(node.parentNode);
    }

    const nodeStyle = window.getComputedStyle(node);
    const overflowValue = `${nodeStyle.overflow}${nodeStyle.overflowX}${nodeStyle.overflowY}`;
    const isScrollable = /(auto|scroll|overlay)/.test(overflowValue);

    if (isScrollable || node.nodeName.toLowerCase() === 'body' || node.parentNode === null) {
      return node;
    }

    return this._getScrollParent(node.parentNode);
  }

  _cacheElements() {
    this.scrollEl = this._getScrollParent(this);

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

  _positionContent() {
    let scrollRect = this.scrollEl.getBoundingClientRect();
    let toolTipRect = this.getBoundingClientRect();

    // Calculate overlap
    const overlaps = {
      left: toolTipRect.left < scrollRect.left,
      right: toolTipRect.right > scrollRect.right,
      top: toolTipRect.top < scrollRect.top,
      bottom: toolTipRect.bottom > scrollRect.bottom,
    };
    const hasOverlap = Object.values(overlaps).some((value) => value === true);
    let overlapClass = '';
    let removeClass = '';
    if (hasOverlap) {
      if (overlaps.top && this.classList.contains('corn-tooltip--top')) {
        removeClass = `${this.classPrefix}top`;
        overlapClass = `${this.classPrefix}bottom`;
      }
      if (overlaps.bottom && this.classList.contains('corn-tooltip--bottom')) {
        removeClass = `${this.classPrefix}bottom`;
        overlapClass = `${this.classPrefix}top`;
      }
      if (overlaps.left && this.classList.contains('corn-tooltip--left')) {
        removeClass = `${this.classPrefix}left`;
        overlapClass = `${this.classPrefix}right`;
      }
      if (overlaps.right && this.classList.contains('corn-tooltip--right')) {
        removeClass = `${this.classPrefix}right`;
        overlapClass = `${this.classPrefix}left`;
      }
      this.classList.remove(removeClass);
      this.overlapClass = overlapClass;
      this.classList.add(overlapClass);
    } else {
      this.overlapClass = null;
    }
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
    const parentLabelledby = new Set((this.parent.getAttribute('aria-labelledby') || '').split(' '));
    parentLabelledby.delete(this.id);
    if (parentLabelledby.size === 0) {
      this.parent.removeAttribute('aria-labelledby');
    } else {
      this.parent.setAttribute('aria-labelledby', [...parentLabelledby].join(' ').trim());
    }
  }
}
customElements.define('corn-tooltip', CornTooltip);
