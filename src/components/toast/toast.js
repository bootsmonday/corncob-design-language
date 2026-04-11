export class CornToast extends HTMLElement {
  constructor() {
    super();
  }
  /**
   * Attributes:
   * - delay: duration in ms before the toast disappears (default: 5000)
   * - count: maximum number of toasts to show at once (default: 5)
   */
  static get observedAttributes() {
    return ['delay', 'count'];
  }

  /**
   *  Handle changes to observed attributes and update internal state accordingly.
   * @param {*} name
   * @param {*} oldValue
   * @param {*} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'delay') this._duration = Number(newValue);
    if (name === 'count') this._count = newValue;
  }

  /**
   * Lifecycle method called when the element is added to the DOM. Initializes internal state, creates necessary child elements, and sets up event listeners.
   * - Initializes _count and _duration from attributes or defaults.
   * - Creates a <ul> for the toast list and sets the popover attribute for the Popover API.
   * - Caches references to these elements for later use.
   */
  connectedCallback() {
    this.setAttribute('popover', 'manual');
    this._count = this.getAttribute('count') || 5;
    this._duration = Number(this.getAttribute('delay')) || 5000;
    this._createElements();
    this._cacheElements();
  }

  addToast(message) {
    if (this.matches(':popover-open') === false) {
      this.showPopover();
    }
    if (this._toastList.childElementCount >= this._count) {
      this._toastQueue = this._toastQueue || [];
      this._toastQueue.push(message);
      return;
    }

    const toastListItem = document.createElement('li');

    if (message.type) {
      toastListItem.classList.add(`corn-toast--${message.type}`);
    }

    const toastItem = document.createElement('div');
    toastListItem.appendChild(toastItem);
    toastItem.className = 'corn-toast--item';

    if (message.icon) {
      this._addIcon(toastItem, message.icon);
    }

    const toastMessage = document.createElement('span');
    toastMessage.className = 'corn-toast--message';
    toastMessage.textContent = message.text;
    toastItem.appendChild(toastMessage);
    this._toastList.appendChild(toastListItem);

    setTimeout(() => {
      this._removeToast(toastListItem);

      if (this._toastQueue && this._toastQueue.length > 0) {
        this.addToast(this._toastQueue.shift());
      }
      if (this._toastList.childElementCount === 0) {
        this.hidePopover();
      }
    }, message.duration || this._duration);
  }

  _removeToast(toastListItem) {
    toastListItem.remove();
  }
  /**
   * Adds an optional icon element to the toast item container.
   * Normalizes the icon input (DOM element or string markup) and appends it to the toast item under a span with the corn-toast--status class.
   *
   * @param {*} toastItem
   * @param {*} icon
   * @returns
   */

  _addIcon(toastItem, icon) {
    const iconElement = this._normalizeIcon(icon);

    if (!iconElement) {
      return;
    }

    const iconContainer = document.createElement('span');

    iconContainer.className = 'corn-toast--status';
    iconContainer.setAttribute('aria-hidden', 'true');
    iconContainer.appendChild(iconElement);

    toastItem.appendChild(iconContainer);
  }

  /**
   *  Normalization strategy:
   * 1. If it's already a DOM element (SVG, img, span, etc.), clone it and sanitize it.
   * 2. If it's a string, parse it into a DOM element and sanitize it.
   * 3. If it's neither, return null.
   *
   * @param {*} icon
   * @returns
   */
  _normalizeIcon(icon) {
    // 1. If it's already a DOM element (SVG, img, span, etc.)
    if (icon instanceof Element) {
      return this._sanitizeIcon(icon.cloneNode(true), true);
    }

    // 2. If it's not a string, reject it
    if (typeof icon !== 'string') {
      return null;
    }

    const markup = icon.trim();

    // 3. Empty string → nothing to do
    if (!markup) {
      return null;
    }

    // 4. Create temporary container and parse the markup
    // Used for strings like <i class="bi bi-info-circle"></i> or <svg>...</svg>
    const temp = document.createElement('div'); // Better than <span> for parsing

    // Use setHTML if available for better parsing (e.g., SVG), fallback to innerHTML
    // setHTML not supported in Safari yet
    if (typeof temp.setHTML === 'function') {
      temp.setHTML(markup);
    } else {
      temp.innerHTML = markup;
    }

    const iconElement = temp.firstElementChild;

    // No valid element found
    if (!iconElement) {
      return null;
    }

    // 5. Sanitize and validate the root element
    return this._sanitizeIcon(iconElement, true);
  }

  /*
  * Sanitization strategy:
    - Only allow certain tags at the root level (e.g., span, i, svg, img)
    - Remove any <script>, <iframe>, <object>, <embed>, <foreignObject> tags anywhere in the tree
    - Remove any event handler attributes (e.g., onclick) and srcdoc attributes
    - Block javascript: URLs in href/src/xlink:href attributes

    Basic sanitation, not meant to be comprehensive. For more robust solutions, consider using a library like DOMPurify before sending to this component.
  */
  _sanitizeIcon(el, isRoot = false) {
    const allowedRootTags = new Set(['span', 'i', 'svg', 'img']);
    const blockedTags = new Set(['script', 'iframe', 'object', 'embed', 'foreignobject']);
    const tagName = el.tagName?.toLowerCase() || '';

    // Root element must be one of the allowed icon types
    if (isRoot && !allowedRootTags.has(tagName)) {
      return null;
    }

    // Sanitize children recursively
    Array.from(el.children).forEach((child) => {
      const childTag = child.tagName?.toLowerCase() || '';

      if (blockedTags.has(childTag)) {
        child.remove();
        return;
      }

      this._sanitizeIcon(child, false); // Not root anymore
    });

    // Sanitize attributes
    Array.from(el.attributes).forEach((attr) => {
      const attrName = attr.name.toLowerCase();
      const attrValue = attr.value.trim().toLowerCase();

      // Remove dangerous event handlers and srcdoc
      if (attrName.startsWith('on') || attrName === 'srcdoc') {
        el.removeAttribute(attr.name);
        return;
      }

      // Block javascript: URLs in href/src/xlink:href
      if (['href', 'xlink:href', 'src'].includes(attrName) && attrValue.startsWith('javascript:')) {
        el.removeAttribute(attr.name);
      }
    });

    return el;
  }

  _createElements() {
    const toastList = document.createElement('ul');
    toastList.setAttribute('aria-live', 'polite');
    this.appendChild(toastList);
  }

  _cacheElements() {
    this._toastList = this.querySelector('ul');
  }
}

if (!customElements.get('corn-toast')) {
  customElements.define('corn-toast', CornToast);
}
