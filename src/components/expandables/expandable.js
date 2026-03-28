/**
 * CornExpandable is a custom web component that represents an expandable section of content, similar to the native HTML <details> element but with enhanced functionality and styling.
 * It uses a shadow DOM to encapsulate its structure and styles, and it provides methods for toggling the open/closed state of the expandable content.
 * The component also observes changes to a 'name' attribute, allowing for potential grouping of multiple expandables based on their name.
 * Event listeners are set up to handle user interactions, such as clicking the summary to toggle the details, and to manage CSS transitions for smooth opening and closing animations.
 * Overall, CornExpandable is designed to provide a flexible and interactive way to display expandable content in a web application.
 */

const template = document.createElement('template');
template.innerHTML = `
  <slot name="details">
    <slot name="summary"></slot>
    <slot></slot>
  </slot>
`;

export class CornExpandable extends HTMLElement {
  /**
   * Returns an array of attribute names to be observed for changes.
   * When any of these attributes change, the attributeChangedCallback is invoked.
   */
  static get observedAttributes() {
    return ['name', 'open'];
  }
  /**
   * Constructor is called when the element is created.
   * Note:
   * 1. Always call super() first in the constructor of a subclass to ensure that the parent class is properly initialized before accessing 'this'.
   * 2. Create a shadow root using this.attachShadow({ mode: 'open' }) to encapsulate the component's DOM and styles, preventing them from affecting the rest of the document and vice versa.
   * 3. Append the template content to the shadow root to render the component's structure defined in the template.
   * This setup allows for better modularity and reusability of the component while maintaining a clean separation of concerns.
   */
  constructor() {
    super(); // 1. Always call super first
    this.isOpen = false;
    // 2. Create the shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
  }

  /**
   * Called when one of the observed attributes is added, removed, or changed.
   * TODO: Implement logic to handle changes to the 'name' attribute, such as updating internal state or modifying the component's appearance based on the new value.
   * @param {string} name - The name of the attribute that changed.
   * @param {string} oldValue - The previous value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attribute changed', name, oldValue, newValue);
  }

  /**
   * Called when the element is added to the DOM. This is a good place to perform setup tasks, such as caching references to child elements, adding event listeners, or initializing state.
   * In this implementation, it calls the _cacheElements method to store references to important child elements and the _addEventListeners method to set up event listeners for user interactions.
   * This method is essential for ensuring that the component is fully functional and interactive once it is part of the document.
   */
  connectedCallback() {
    this._cacheElements();
    this._addEventListeners();
    this._checkInitialOpenState();
  }

  /**
   * _checkInitialOpenState is a method that checks if the 'open' attribute is present on the component when it is first connected to the DOM.
   * If the 'open' attribute is found, it calls the _open method to set the details element to an open state.
   * This allows the component to be initialized in an open state if desired by simply adding the 'open' attribute in the HTML markup, providing flexibility in how the component can be used and displayed when it is first rendered.
   */
  _checkInitialOpenState() {
    if (this.hasAttribute('open')) {
      this._open(this.details);
    }
  }
  /**
   * _cacheElements is a method that retrieves and stores references to important child elements within the component. It uses the shadow DOM's querySelector to find elements based on their slot names and class names. This
   * method is essential for ensuring that the component can efficiently access and manipulate its internal elements without repeatedly querying the DOM, which can improve performance and maintainability.
   */
  _cacheElements() {
    this.details = this.shadowRoot.querySelector('slot[name="details"]').assignedElements()[0];
    this.summary = this.details.querySelector('summary');
    this.content = this.details.querySelector('.corn-expandable--content');
    if (this.details.name) {
      this.detailCollection = this.parentNode.querySelectorAll(`[name="${this.details.name}"]`);
    } else {
      this.detailCollection = null;
    }
  }

  /**
   * _addEventListeners is a method that sets up event listeners for user interactions with the component.
   * In this case, it listens for the 'transitioncancel' event on the content element to handle cases where the transition is interrupted, ensuring that the component's state remains consistent.
   * It also listens for 'click' events on the summary element to toggle the open/closed state of the details element.
   * This method is crucial for making the component interactive and responsive to user actions, allowing it to function as an expandable section in the UI.
   * You can't cancel the toggle event, the toggle event is applies the attribute open to the details element before the event is dispatched, so by the time you can listen for the toggle event, the state has already changed.
   * And you can't animate the close event because the open attribute is removed immediately when the user clicks the summary, so there is no way to trigger a CSS transition for closing.
   */
  _addEventListeners() {
    this.content.addEventListener('transitioncancel', this._cancelTransition);
    this.summary.addEventListener('click', this._toggle);
  }

  /**
   * _cancelTransition is an event handler that is called when a CSS transition on the content element is canceled.
   * It checks the propertyName of the event to ensure that it only responds to transitions related to 'grid-template-rows', which is the property being animated for the expand/collapse effect.
   * If the details element is open but does not have the 'corn-expandable--open' class, it sets open to false, effectively closing it. Conversely, if the details element is closed but has the 'corn-expandable--open' class, it removes that class. This method ensures that the component's state remains consistent even if a transition is interrupted, preventing visual glitches and maintaining a smooth user experience.
   */
  _cancelTransition = (evt) => {
    if (evt.propertyName !== 'grid-template-rows') return;
    if (this.details.open && !this.details.classList.contains('corn-expandable--open')) {
      this.details.open = false;
    } else if (!this.details.open && this.details.classList.contains('corn-expandable--open')) {
      this.details.classList.remove('corn-expandable--open');
    }
  };

  /**
   * _removeEventListeners is a method that removes the event listeners that were added in the _addEventListeners method.
   * It is important to remove event listeners when they are no longer needed, such as when the component is disconnected from the DOM, to prevent memory leaks and unintended behavior.
   * In this implementation, it removes the 'transitioncancel' event listener from the content element and the 'click' event listener from the summary element, ensuring that the component does not continue to respond to events after it has been removed from the document.
   */
  _removeEventListeners() {
    this.content.removeEventListener('transitioncancel', this._cancelTransition);
    this.summary.removeEventListener('click', this._toggle);
  }

  /**
   * _toggle is an event handler that toggles the open/closed state of the details element.
   * It is called when the summary element is clicked.
   * @param {Event} evt - The event object representing the click event.
   * @returns {void}
   */
  _toggle = (evt) => {
    evt.preventDefault();

    if (this.detailCollection?.length > 0) {
      let closingDetail = null;
      this.detailCollection.forEach((detail) => {
        if (detail === this.details) return;
        if (detail.open) {
          this._close(detail, evt);
          closingDetail = detail;
        }
      });
      if (!closingDetail) {
        this.details.open ? this._close(this.details) : this._open(this.details);
      }
      return;
    }
    if (this.details.open) {
      this._close(this.details);
    } else {
      this._open(this.details);
    }
  };

  /**
   * _open is a method that opens the details element by setting its open property to true and adding the 'corn-expandable--open' class.
   * @param {HTMLDetailsElement} details - The details element to be opened.
   */
  _open(details) {
    details.open = true;
    window.requestAnimationFrame(() => {
      details.classList.add('corn-expandable--open');
    });
    details.querySelector('.corn-expandable--content').addEventListener(
      'transitionend',
      (evt) => {
        if (evt.propertyName !== 'grid-template-rows') return;
      },
      { once: true }
    );
  }

  /**
   * _close is a method that closes the details element by removing the 'corn-expandable--open' class and setting its open property to false.
   * @param {HTMLDetailsElement} details - The details element to be closed.
   * @param {Event} [nextEvt] - An optional event object representing the next event to be processed after closing. This allows for chaining of open/close actions if multiple details elements are being toggled in sequence.
   * This method also listens for the 'transitionend' event on the content element to ensure that the open property is only set to false after the closing transition has completed, providing a smooth user experience.
   */
  _close(details, nextEvt) {
    details.classList.remove('corn-expandable--open');
    this.isAnimating = true;
    details.querySelector('.corn-expandable--content').addEventListener(
      'transitionend',
      (evt) => {
        if (evt.propertyName !== 'grid-template-rows') return;

        details.open = false;
        this.isAnimating = false;
        if (nextEvt) {
          this._toggle(nextEvt);
        }
      },
      { once: true }
    );
  }

  /**
   * disconnectedCallback is called when the element is removed from the DOM. This is a good place to perform cleanup tasks, such as removing event listeners or canceling any ongoing operations that are no longer needed.
   * In this implementation, it calls the _removeEventListeners method to clean up any event listeners that were added when the element was connected. This is important to prevent memory leaks and ensure that the component does not continue to respond to events after it has been removed from the DOM.
   * By removing event listeners in the disconnectedCallback, we ensure that the component is properly cleaned up and does not cause unintended side effects in the application after it has been removed.
   * This is a crucial part of managing the lifecycle of custom elements and ensuring that they behave correctly in dynamic applications where elements may be added and removed frequently.
   */
  disconnectedCallback() {
    this._removeEventListeners();
  }
}
customElements.define('corn-expandable', CornExpandable);
