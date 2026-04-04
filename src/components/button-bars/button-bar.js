/**
 * CornButtonBar is a custom web component that represents a button bar with an overflow menu.
 * It is designed to handle situations where there are more buttons than can fit in a single row, allowing the user to access additional buttons through an overflow menu.
 * The component uses a ResizeObserver to monitor changes in its size and dynamically move overflowing buttons into the overflow menu as needed.
 * It also includes lifecycle methods to manage event listeners and ensure proper cleanup when the component is removed from the DOM.
 */


/**
 * Set up template for the CornButtonBar component, which includes a default slot for the main buttons and a named slot for a custom "more" button that triggers the overflow menu. 
 * The template is cloned and attached to the shadow DOM of each instance of the CornButtonBar, allowing for encapsulation of styles and structure while still providing flexibility for users to customize the content of the button bar.
 */
const template = document.createElement('template');
template.innerHTML = `
    <style>
      slot { display: contents; }
    </style>
    <slot></slot>
    <slot name="more-button"></slot>
`;

export class CornButtonBar extends HTMLElement {
  /**
   * The constructor method is called when a new instance of the CornButtonBar component is created.
   * In this method, we call the super() method to ensure that the HTMLElement constructor is properly initialized.
   */
  constructor() {
    super();
    this.initialized = false;
    this.style.visibility = 'hidden';
    this._internals = this.attachInternals();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * connectedCallback is a lifecycle method that is called when the element is added to the DOM.
   * In this method, we call _cacheElements to store references to important child elements and _addEventListeners to set up any necessary event listeners for the component.
   * This ensures that the component is fully initialized and ready to respond to user interactions as soon as it is connected to the DOM.
   */
  connectedCallback() {
    this._cacheElements();
    this._addEventListeners();
  }

  /**
   * observedAttributes is a static getter that returns an array of attribute names that the component wants to observe for changes. In this case, we are observing the 'overflow-label' attribute, which allows users to customize the label of the overflow menu trigger button. 
   * When this attribute changes, the attributeChangedCallback method will be called, allowing us to update the component's behavior or appearance based on the new value of the attribute. This is a key part of making the component flexible and customizable for different use cases.
   * @returns {string[]} An array of attribute names to observe for changes.
   */
  static get observedAttributes() {
    return ['overflow-label'];
  }

  /**
   * attributeChangedCallback is a lifecycle method that is called when one of the observed attributes changes.
   * In this case, it updates the _overflowLabel property when the 'overflow-label' attribute changes.
   * @param {string} name - The name of the attribute that changed.
   * @param {string} oldValue - The previous value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'overflow-label') this._overflowLabel = newValue ?? 'More';
  }

  /**
   * _addEventListeners is a method that sets up event listeners for the component. In this case, it uses a ResizeObserver to monitor changes in the size of the button bar. When the size changes, it calls the _moveOverflowingItems method to adjust which items are visible in the button bar and which are moved to an overflow menu (if applicable). This allows the button bar to dynamically adapt to different screen sizes and ensure that all buttons remain accessible even when there isn't enough space to display them all in a single row.
   */
  _addEventListeners() {
    // Using ResizeObserver to detect changes in the size of the button bar and adjust the overflowing items accordingly
    // Use window.requestAnimationFrame to ensure that the DOM updates are processed before calculating the overflowing items, which can help prevent layout thrashing and improve performance.
    this.resizeObserver = new ResizeObserver(() => window.requestAnimationFrame(() => this._moveOverflowingItems()));
    this.resizeObserver.observe(this);
  }

  /**
   * _removeEventListeners is a method that removes the event listeners that were added in the _addEventListeners method.
   * It removes the click event listener from the trigger element and the keydown event listener from the popover itself.
   * It also removes the clickListener from the document to prevent it from listening for clicks when the popover is closed.
   * This cleanup is important to avoid memory leaks and unintended behavior when the component is removed from the DOM or when it is no longer needed.
   */
  _removeEventListeners() {
    this.resizeObserver.unobserve(this);
    this.resizeObserver.disconnect();
    this.resizeObserver = null;

  }

  /**
   * This creates the overflow container for the button bar, which includes a trigger button and a popover for the overflow items. The trigger button is assigned an aria-controls attribute that references the ID of the popover, allowing assistive technologies to understand the relationship between the button and the popover. If a custom "more" button is not provided in the named slot, a default button is created with the label specified by the _overflowLabel property (or "More" if not set). The popover is positioned at the bottom of the trigger button and is initially empty, ready to be populated with overflowing items as needed. This method ensures that the overflow functionality is properly set up and accessible to all users.
   * @returns {HTMLElement} The created overflow container element.
   */
  _createOverflowContainer() {
      const moreElement = document.createElement('div');
      moreElement.classList.add('corn-popover--anchor', 'corn-button-bar--more');

      const hasMoreButton = !!this.shadowRoot.querySelector('slot[name="more-button"]')?.assignedElements()[0];

      const moreButton = this.shadowRoot.querySelector('slot[name="more-button"]')?.assignedElements()[0] ?? document.createElement('button');
      moreButton.classList.add('corn-button', 'corn-button--xs', 'corn-pop');
      const moreButtonId = 'button-bar-' + crypto.randomUUID().substring(0, 8);
      moreButton.setAttribute('aria-controls', moreButtonId);
      
      if (!hasMoreButton) {
        moreButton.textContent = this._overflowLabel || 'More';
      }

      const moreItems = document.createElement('corn-popover');
      moreItems.setAttribute('position', 'bottom');
      moreItems.setAttribute('id', moreButtonId);
      moreItems.classList.add('corn-popover');

      moreElement.appendChild(moreButton);
      moreElement.appendChild(moreItems);

      this.appendChild(moreElement);
      return moreElement;
  }

  /**
   * _cacheElements is a method that caches references to important child elements within the button bar.
   * In this case, it looks for an element with the class 'corn-button-bar--more' which is likely a button that triggers an overflow menu, and then it looks for a 'corn-popover' element within that button which would contain the overflow items.
   * Caching these elements allows the component to efficiently access and manipulate them later when handling events or updating the UI, without needing to repeatedly query the DOM.
   */
  _cacheElements() {
    this.moreElement = this.querySelector('.corn-button-bar--more') ?? this._createOverflowContainer();

    this.moreItems = this.moreElement.querySelector('.corn-popover');
    this.moreButton = this.moreElement.querySelector('.corn-pop');
  }

  /**
   * _hasOverflow is a method that checks if there are any overflowing items in the button bar.
   * It temporarily moves all items from the overflow menu back to the main button bar to accurately measure their positions.
   * It then checks if any items have wrapped to a new line, indicating that they are overflowing.
   * @returns {boolean} True if there are overflowing items, false otherwise.
   */
  _hasOverflow() {
   
    const overflowingItems = Array.from(this.moreItems.children);

    for (const item of overflowingItems) {
      this.insertBefore(item, this.moreElement);
    }

    const items = Array.from(this.children);
    const initialOffset = items[0]?.offsetTop || 0;

    return items.some((item) => item.offsetTop > initialOffset);
  }

  /**
   * _moveOverflowingItems is a method that moves the identified overflowing items from the main button bar into the overflow menu (moreItems).
   * It first calls _hasOverflow to check if there are any overflowing items, and if so, it moves them to the moreItems container.
   * This allows the button bar to maintain a clean layout while still providing access to all buttons through the overflow menu when there isn't enough space to display them all in a single row.
   * @returns {void}
   */
  _moveOverflowingItems() {
    if (!this._hasOverflow()) {
      if(!this.initialized) {
        this.style.removeProperty('visibility');
        this.initialized = true;
      };
      return;
    } else {
      const items = Array.from(this.children);
      const initialOffset = items[0]?.offsetTop;
      // Reverse the order of items to ensure that we move the last overflowing items first, which helps maintain the correct order in the overflow menu.
      items.reverse();
      items.forEach((item) => {
        if (item !== this.moreElement) {
          if (item.offsetTop > initialOffset || this.moreElement.offsetTop > initialOffset) {
            // Move the overflowing item to the moreItems container (overflow menu)
            // Prepend the item to the moreItems container to maintain the correct order in the overflow menu, ensuring that the most recently moved items appear at the top of the menu.
            this.moreItems.prepend(item);
          }
        }
      });
      // This makes it look cleaner as you don't see the items moving around before they are moved to the overflow menu on initial load.
      if(!this.initialized) {
        this.style.removeProperty('visibility');
        this.initialized = true;
      }
    }
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
