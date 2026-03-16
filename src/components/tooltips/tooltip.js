export class CornTooltip extends HTMLElement {
  static get observedAttributes() {
    return ['position'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'position') this._position = newValue;
    this.classList.add('corn-tooltip--' + this._position);
  }

  connectedCallback() {
    this.parent = this.closest('.corn-tooltip');
    if (!this.parent) return;
    if (!this._position) this._position = 'top';
    this.classPrefix = 'corn-tooltip--';
    this.classList.add(this.classPrefix + this._position);
    this._cacheElements();
    this._addEventListeners();
    this._addAccessiblity();
  }
  _addAccessiblity() {
    this.setAttribute('role', 'tooltip');
    if (!this.id) this.id = 'corn-tooltip--' + crypto.randomUUID().substring(0, 8);
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

  _getScrollParent(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const nodeStyle = window.getComputedStyle(node);
      if (
        nodeStyle.overflow.match(/scroll/) ||
        node.nodeName.toLowerCase() === 'body' ||
        node.parentNode === null
      ) {
        return node;
      } else {
        return this._getScrollParent(node.parentNode);
      }
    } else {
      return node;
    }
  }
  _cacheElements() {
    this.scrollEl = this._getScrollParent(this);

    this.observerOptions = {
      root: document.documentElement,
      rootMargin: '0px',
      threshold: 1.0,
    };
  }

  _intersectionCallback(entries) {
    if (entries[0].isIntersecting === true) {
      this._currentRatio = entries[0].intersectionRatio;
      this._positionContent();
    } else {
      this._positionContent();
    }
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
    this.resizeObserver = new ResizeObserver((entries) => this._intersectionCallback(entries));
    this.resizeObserver.observe(this.scrollEl);
  }
  _close() {
    this.resizeObserver.unobserve(this.scrollEl);
  }
  disconnectedCallback() {
    console.log('disconnect call back');
    this.resizeObserver.unobserve(this.scrollEl);
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
customElements.define('corn-tooltip', CornTooltip);
