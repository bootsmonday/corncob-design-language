export class CornPopover extends HTMLElement {
  /**
   * Constructor is called when the element is created.
   * Note:
   */
  constructor() {
    super();
    this.isOpen = false;
  }

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
   * The class added is in the format 'corn-popover--' followed by the new position value (e.g., 'corn-popover--top').
   * This allows the element to dynamically update its styling based on the position attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'position') this._position = newValue;
    this.classList.add('corn-popover--' + this._position);
  }

  /**
   * connectedCallback is called when the element is added to the DOM.
   * In this method, the component looks for its closest ancestor with the class 'corn-popover--anchor' and assigns it to this.parent.
   * It also looks for a child element with the class 'corn-pop' within the parent and assigns it to this.trigger.
   * If no parent is found, the method returns early, preventing further execution.
   * If the position attribute was not set before, it defaults to 'top'.
   * The method then constructs a class prefix for styling and adds a class to the element based on the position (e.g., 'corn-popover--top').
   * Finally, it calls methods to cache elements and add event listeners for interactivity.
   * This setup allows the popover to be associated with a trigger element and to be styled according to its position relative to the trigger.
   * The event listeners will handle user interactions such as clicking the trigger to open or close the popover.
   */
  connectedCallback() {
    this.parent = this.closest('.corn-popover--anchor');
    this.trigger = this.parent.querySelector('.corn-pop');

    if (!this.parent) return;
    if (!this._position) this._position = 'top';
    this.classPrefix = 'corn-popover--';
    this.classList.add(this.classPrefix + this._position);
    this._cacheElements();
    this._addEventListeners();
  }

  /**
   * _addEventListeners is a method that sets up event listeners for the popover component.
   * It adds a click event listener to the trigger element (the element that will open the popover) that calls the _toggle method when clicked.
   * It also adds a keydown event listener to the popover itself that calls the trapFocus method, which is responsible for managing keyboard navigation within the popover (e.g., trapping focus inside the popover when it's open).
   * Additionally, it defines a clickListener function that checks if a click event occurs outside of the popover and its trigger. If such a click is detected, it calls the _close method to close the popover.
   * This setup ensures that the popover can be opened and closed through user interactions, and that keyboard navigation is properly handled for accessibility.
   * The clickListener is added to the document when the popover is opened and removed when it's closed to manage event listeners efficiently.
   */
  _addEventListeners() {
    this.trigger.addEventListener('click', this._toggle);
    this.addEventListener('keydown', this._trapFocus);
  }

  /**
   * _clickListener is a function that listens for click events on the document. It checks if the click occurred outside of the popover and its trigger element. If the click is detected outside of these elements, it calls the _close method to close the popover. This allows users to click anywhere outside the popover to dismiss it, enhancing usability and providing a common interaction pattern for popovers and modals.
   * The _clickListener is added to the document when the popover is opened and removed when it's closed to ensure that it only listens for clicks when necessary, preventing unnecessary event handling and potential performance issues.
   * This approach also helps to avoid conflicts with other click events on the page, as the listener is only active when the popover is open.
   * By checking if the click target is not within the popover or its trigger, it ensures that interactions with the popover itself or its trigger do not inadvertently close it.
   * This functionality is crucial for providing a seamless user experience, allowing users to easily dismiss the popover without having to interact with specific close buttons or controls.
   * Overall, this method enhances the interactivity and usability of the popover component by allowing users to intuitively close it through common interactions.
   */
  _clickListener = (evt) => {
    if (!this.contains(evt.target) && !this.trigger.contains(evt.target)) {
      this._close();
    }
  };

  /**
   * _removeEventListeners is a method that removes the event listeners that were added in the _addEventListeners method. It removes the click event listener from the trigger element and the keydown event listener from the popover itself. It also removes the clickListener from the document to prevent it from listening for clicks when the popover is closed. This cleanup is important to avoid memory leaks and unintended behavior when the component is removed from the DOM or when it is no longer needed.
   */
  _removeEventListeners() {
    this.trigger.removeEventListener('click', this._toggle);
    this.removeEventListener('keydown', this._trapFocus);
    document.removeEventListener('click', this._clickListener);
  }

  /**
   * _toggle is a method that toggles the open state of the popover. If the popover is currently open, it calls the _close method to close it. If the popover is currently closed, it calls the _open method to open it. This method is typically called in response to user interactions, such as clicking the trigger element, allowing users to easily open and close the popover as needed.
   */
  _toggle = () => {
    if (this.isOpen) {
      this._close();
    } else {
      this._open();
    }
  };

  /**
   * _trapFocus is a method that traps the focus within the popover when it is open.
   * It listens for keydown events and handles the Tab and Shift+Tab keys to ensure that the focus cycles through the focusable elements within the popover.
   * It also listens for the Escape key to close the popover and return focus to the previously active element.
   * @param {KeyboardEvent} evt - The keyboard event object.
   * @returns {void}
   */
  _trapFocus = (evt) => {
    if (evt.key === 'Escape') {
      this._close();
      evt.stopPropagation();
      this.activeElement.focus();
      return;
    }
    if (evt.key !== 'Tab') return;
    if (this.focusableElements.length === 0) return;
    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];
    if (evt.shiftKey) {
      if (document.activeElement === firstElement) {
        evt.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        evt.preventDefault();
        firstElement.focus();
      }
    }
  };

  /**
   * _cacheElements is a method that caches references to important elements and sets up initial state for the popover.
   * It determines the scroll parent of the popover using the _getScrollParent method, which is important for positioning the popover correctly within the viewport.
   * It also initializes the isOpen property to false and sets up options for an IntersectionObserver, which can be used to monitor the visibility of the popover and adjust its position if it goes out of view.
   * This method is called during the connectedCallback to ensure that all necessary elements and state are set up when the component is added to the DOM.
   */
  _cacheElements() {
    this.scrollEl = this._getScrollParent(this);
    this.isOpen = false;
  }

  /**
   * _getScrollParent is a method that recursively checks the ancestors of a given node to find the nearest scrollable parent element.
   * It checks if the current node is an element and if its computed overflow style allows for scrolling.
   * If it finds such an element, it returns it as the scroll parent.
   * If it reaches the body element or the root of the document without finding a scrollable ancestor, it returns the body element as the default scroll parent.
   * This method is crucial for determining how to position the popover correctly within the viewport, especially when dealing with nested scrollable containers.
   *
   * @param {*} node
   * @returns
   */
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

  /**
   * _positionContent is a method that calculates the position of the popover and checks for any overlap with the boundaries of the scroll parent.
   * It retrieves the bounding rectangles of both the scroll parent and the popover itself, and then determines if there is any overlap on each side (top, bottom, left, right). If an overlap is detected, it adjusts the classes on the popover to change its position accordingly (e.g., switching from top to bottom if there is an overlap at the top). This method ensures that the popover remains visible and properly positioned within the viewport, even when there are constraints due to scrolling or limited space.
   * The method also accounts for the case when the scroll parent is the body element, adjusting the bottom value to ensure that the popover does not extend beyond the viewport height. By dynamically adjusting the position of the popover based on its visibility and available space, this method enhances the user experience by preventing content from being hidden or inaccessible due to overflow issues.
   */
  _positionContent() {
    let scrollRect = this.scrollEl.getBoundingClientRect().toJSON();
    // If the scroll parent is the body, we need to adjust the bottom value to account for the viewport height
    if (this.scrollEl === document.body) {
      if (scrollRect.bottom < window.innerHeight) {
        scrollRect.bottom = window.innerHeight;
      }
    }

    let popOverRect = this.getBoundingClientRect();

    // Calculate overlap
    const overlaps = {
      left: popOverRect.left < scrollRect.left,
      right: popOverRect.right > scrollRect.right,
      top: popOverRect.top < scrollRect.top,
      bottom: popOverRect.bottom > scrollRect.bottom,
    };

    const hasOverlap = Object.values(overlaps).some((value) => value === true);

    let overlapClass = '';
    let removeClass = '';

    if (hasOverlap) {
      if (overlaps.top && this.classList.contains('corn-popover--top')) {
        removeClass = `${this.classPrefix}top`;
        overlapClass = `${this.classPrefix}bottom`;
      }
      if (overlaps.bottom && this.classList.contains('corn-popover--bottom')) {
        removeClass = `${this.classPrefix}bottom`;
        overlapClass = `${this.classPrefix}top`;
      }
      if (overlaps.left && this.classList.contains('corn-popover--left')) {
        removeClass = `${this.classPrefix}left`;
        overlapClass = `${this.classPrefix}right`;
      }
      if (overlaps.right && this.classList.contains('corn-popover--right')) {
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

  /**
   *
   * _getAllFocusableElements is a method that retrieves all focusable elements within the popover.
   * It uses a query selector to find elements that are typically focusable, such as buttons, links, form controls, and any element with a tabindex that is not set to -1.
   * This method is important for managing keyboard navigation within the popover, allowing the trapFocus method to cycle through these elements when the user presses the Tab key.
   * By ensuring that only focusable elements are included in this list, the component can provide a better user experience and improve accessibility for users who rely on keyboard navigation.
   *
   * @returns {HTMLElement[]} An array of all focusable elements within the popover.
   */
  _getAllFocusableElements() {
    return [
      ...this.querySelectorAll(
        'button, [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ),
    ];
  }

  /**
   * _open is a method that opens the popover.
   * It first stores the currently active element to return focus to it when the popover is closed.
   * It then checks for any overlap classes and adjusts the position of the popover accordingly.
   * The method adds a class to indicate that the popover is open, sets the isOpen property to true, retrieves all focusable elements within the popover, and focuses the first one.
   * Finally, it adds a click event listener to the document to listen for clicks outside the popover, allowing it to be closed when such clicks occur.
   * This method ensures that the popover is properly displayed and that keyboard navigation is handled correctly for accessibility.
   */
  _open() {
    this.activeElement = document.activeElement;

    if (this.overlapClass) {
      this.classList.remove(this.overlapClass);
      this.classList.add(this.classPrefix + this._position);
    }

    this.classList.add('corn-popover--open');
    this.isOpen = true;
    this.focusableElements = this._getAllFocusableElements();
    this.focusableElements[0]?.focus({ focusVisible: true });
    this._positionContent();
    document.addEventListener('click', this._clickListener);
  }

  /**
   * _close is a method that closes the popover.
   * It sets the isOpen property to false, removes the class that indicates the popover is open, and removes the click event listener from the document to stop listening for clicks outside the popover.
   * This method ensures that the popover is properly hidden and that event listeners are cleaned up to prevent memory leaks and unintended behavior when the popover is closed.
   * By removing the click event listener, it also prevents the popover from being closed by clicks that occur after it has already been closed, which could lead to a confusing user experience.
   * Overall, this method is essential for managing the state of the popover and ensuring that it behaves as expected when users interact with it.
   */
  _close() {
    this.isOpen = false;
    this.classList.remove('corn-popover--open');
    document.removeEventListener('click', this._clickListener);
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
customElements.define('corn-popover', CornPopover);
