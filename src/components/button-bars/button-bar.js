export class CornButtonBar extends HTMLElement {
  /**
   * Constructor is called when the element is created.
   * Note:
   */
  constructor() {
    super();
    console.log('constructor call back');
  }
  detectFlexWrap = (containerElement) => {
    const wrappedItems = [];
    const items = Array.from(containerElement.children); // Get flex items

    if (items.length === 0) return wrappedItems;

    let prevItemTop = items[0].getBoundingClientRect().top;

    for (let i = 1; i < items.length; i++) {
      const currentItemTop = items[i].getBoundingClientRect().top;
      if (currentItemTop > prevItemTop) {
        wrappedItems.push(items[i]); // This item has wrapped
      }
      prevItemTop = currentItemTop;
    }
    return wrappedItems;
  };
  /**
   * observedAttributes is a static getter that returns an array of attribute names to monitor for changes.
   * When any of these attributes change, the attributeChangedCallback method is called.
   */
  static get observedAttributes() {
    return ['position'];
  }

  /**
   * attributeChangedCallback is called whenever one of the observed attributes changes.
   * It receives the name of the attribute, its old value, and its new value as arguments.
   * In this case, when the 'position' attribute changes, it updates the internal _position property and adds a corresponding class to the element.
   * The class added is in the format 'corn-button-bar--' followed by the new position value (e.g., 'corn-button-bar--top').
   * This allows the element to dynamically update its styling based on the position attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {}

  connectedCallback() {
    this._cacheElements();
    this._addEventListeners();
  }

  _addEventListeners() {
    // Using ResizeObserver to detect changes in the size of the button bar and adjust the overflowing items accordingly
    // Use window.requestAnimationFrame to ensure that the DOM updates are processed before calculating the overflowing items, which can help prevent layout thrashing and improve performance.
    this.resizeObserver = new ResizeObserver((entries) =>
      window.requestAnimationFrame(() => this._moveOverflowingItems(entries))
    );
    this.resizeObserver.observe(this);
  }

  /**
   * _removeEventListeners is a method that removes the event listeners that were added in the _addEventListeners method. It removes the click event listener from the trigger element and the keydown event listener from the popover itself. It also removes the clickListener from the document to prevent it from listening for clicks when the popover is closed. This cleanup is important to avoid memory leaks and unintended behavior when the component is removed from the DOM or when it is no longer needed.
   */
  _removeEventListeners() {
    this.resizeObserver.unobserve(this);
  }

  _cacheElements() {
    console.log('cache elements');
    this.moreButton = this.querySelector('.corn-button-bar--more');
    this.moreItems = this.moreButton.querySelector('corn-popover');
    // /console.log(this.moreItems);
    //this._moveOverflowingItems();
  }

  _findOverflowingItems() {
    console.log('testing overflow items');
    const overflowingItems = Array.from(this.moreItems.children);
    for (const item of overflowingItems) {
      this.insertBefore(item, this.moreButton);
    }
    const items = Array.from(this.children);
    const initialOffset = items[0]?.offsetTop || 0;

    for (const item of items) {
      const itemOffset = item.offsetTop;
      if (itemOffset > initialOffset) {
        // Return overflowing items starting from the first one that wraps
        return items.slice(items.indexOf(item) - 1);
      }
    }

    return overflowingItems;
  }
  _moveOverflowingItems() {
    this.overflowingItems = this._findOverflowingItems();
    this.overflowingItems.forEach((item) => {
      if (item !== this.moreButton) {
        this.moreItems.appendChild(item);
      }
    });
  }

  /**
   * disconnectedCallback is a lifecycle method that is called when the element is removed from the DOM. In this method, we call _removeEventListeners to clean up any event listeners that were added when the element was connected. This is important to prevent memory leaks and ensure that the component does not continue to respond to events after it has been removed from the DOM.
   * By removing event listeners in the disconnectedCallback, we ensure that the component is properly cleaned up and does not cause unintended side effects in the application after it has been removed.
   * This is a crucial part of managing the lifecycle of custom elements and ensuring that they behave correctly in dynamic applications where elements may be added and removed frequently.
   */
  disconnectedCallback() {
    this._removeEventListeners();
  }
}
customElements.define('corn-button-bar', CornButtonBar);
