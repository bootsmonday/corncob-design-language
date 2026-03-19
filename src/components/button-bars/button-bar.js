/**
 * CornButtonBar is a custom web component that represents a button bar with an overflow menu.
 * It is designed to handle situations where there are more buttons than can fit in a single row, allowing the user to access additional buttons through an overflow menu.
 * The component uses a ResizeObserver to monitor changes in its size and dynamically move overflowing buttons into the overflow menu as needed.
 * It also includes lifecycle methods to manage event listeners and ensure proper cleanup when the component is removed from the DOM.
 */

export class CornButtonBar extends HTMLElement {
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
   * _addEventListeners is a method that sets up event listeners for the component. In this case, it uses a ResizeObserver to monitor changes in the size of the button bar. When the size changes, it calls the _moveOverflowingItems method to adjust which items are visible in the button bar and which are moved to an overflow menu (if applicable). This allows the button bar to dynamically adapt to different screen sizes and ensure that all buttons remain accessible even when there isn't enough space to display them all in a single row.
   */
  _addEventListeners() {
    // Using ResizeObserver to detect changes in the size of the button bar and adjust the overflowing items accordingly
    // Use window.requestAnimationFrame to ensure that the DOM updates are processed before calculating the overflowing items, which can help prevent layout thrashing and improve performance.
    this.resizeObserver = new ResizeObserver((entries) =>
      window.requestAnimationFrame(() => this._moveOverflowingItems(entries))
    );
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
  }

  /**
   * _cacheElements is a method that caches references to important child elements within the button bar.
   * In this case, it looks for an element with the class 'corn-button-bar--more' which is likely a button that triggers an overflow menu, and then it looks for a 'corn-popover' element within that button which would contain the overflow items.
   * Caching these elements allows the component to efficiently access and manipulate them later when handling events or updating the UI, without needing to repeatedly query the DOM.
   */
  _cacheElements() {
    console.log('cache elements');
    this.moreButton = this.querySelector('.corn-button-bar--more');
    this.moreItems = this.moreButton.querySelector('corn-popover');
    // /console.log(this.moreItems);
    //this._moveOverflowingItems();
  }

  /**
   * _findOverflowingItems is a method that identifies which items in the button bar are overflowing and need to be moved to the overflow menu.
   * It calculates the position of each item and determines if it has wrapped to a new line, indicating that it is overflowing.
   * @returns {Array} An array of overflowing items that need to be moved to the overflow menu.
   */
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

  /**
   * _moveOverflowingItems is a method that moves the identified overflowing items from the main button bar into the overflow menu (moreItems).
   * It first calls _findOverflowingItems to get the list of items that are overflowing, and then it appends each of those items to the moreItems container.
   * This allows the button bar to maintain a clean layout while still providing access to all buttons through the overflow menu when there isn't enough space to display them all in a single row.
   */
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
