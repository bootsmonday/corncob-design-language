import CornPopoverStyles from '../popovers/popover.css?inline';
import CornCheckboxStyles from '../checkboxes/checkbox.css?inline';

const template = document.createElement('template');

// this.shadowRoot.addEventListener('slotchange', (e) => {
//   const assignedNodes = e.target.assignedNodes();
//   console.log('Slotted light DOM nodes changed:', assignedNodes);
// });
export class CornSelect extends HTMLElement {
  static formAssociated = true;
  #internals;
  #value = '';
  /**
   * Constructor is called when the element is created.
   * Note:
   */
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.uuid = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).substr(2, 9);
    this.id = this.id || `corn-select-${this.uuid}`;
    this.classList.add('corn-popover--anchor');
    template.innerHTML = `
    <style>
    ${CornPopoverStyles}
    </style>
    <div class="corn-pop" style="height: 100%;width: 100%;"></div>
    <corn-popover id="popover-${this.uuid}" position="bottom" class="corn-popover corn-popover--bottom" role="listbox">
      <slot></slot>
      <div class="corn-select-list"></div>
    </corn-popover>         
    `;
    shadow.appendChild(template.content.cloneNode(true));
    this._slot = this.shadowRoot.querySelector('slot');
    this._popover = this.shadowRoot.querySelector('corn-popover');
    this.#internals = this.attachInternals();
    this.setAttribute('role', 'combobox');
    this.setAttribute('aria-haspopup', 'listbox');
    this.setAttribute('aria-expanded', 'false');
    this.setAttribute('tabindex', '0');
    // const shadow = this.attachShadow({ mode: 'open' });
    // shadow.appendChild(template.content.cloneNode(true));
    // this.id = this.id || `corn-select-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36).substr(2, 9)}`;
    // this.controlID = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).substr(2, 9);
    /*
   <corn-popover id="popover-hhygm" position="bottom" class="corn-popover corn-popover--bottom" role="listbox">
   <div class="corn-checkbox corn-checkbox--xs">
   <input type="checkbox" name="corn-select-hhygm" id="corn-select-hhygm-0" value="option1"><label for="corn-select-hhygm-0">Option 1</label></div><div class="corn-checkbox corn-checkbox--xs"><input type="checkbox" name="corn-select-hhygm" id="corn-select-hhygm-1" value="option2"><label for="corn-select-hhygm-1">Option 2</label></div><div class="corn-checkbox corn-checkbox--xs"><input type="checkbox" name="corn-select-hhygm" id="corn-select-hhygm-2" value="option3"><label for="corn-select-hhygm-2">Option 3</label></div>
   </corn-popover> 
   */
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
    //<corn-popover id="popover-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36).substr(2, 9)}" position="bottom" role="listbox"></corn-popover>
    // this._applyPositionClass();
    //this.render();
    // this._popover = this.shadowRoot.querySelector('corn-popover');
    console.log('connectedCallback', this._popover);
    // this.renderOptions();
    this._addEventListeners();
  }
  _getSizeModifier() {
    const sizeModifiers = ['--xs', '--sm', '--md', '--lg', '--xl'];
    const classList = Array.from(this.parentNode.classList);
    const sizeModifier = sizeModifiers.find((modifier) => classList.some((className) => className.includes(modifier))) || '--md';
    return sizeModifier || '--md';
  }

  render() {
    const popover = document.createElement('corn-popover');
    popover.setAttribute('id', `popover-${this.controlID}`);
    popover.setAttribute('position', 'bottom');
    popover.setAttribute('role', 'listbox');
    popover.classList.add('corn-popover');
    this.setAttribute('aria-controls', popover.id);
    this.parentNode.classList.add('corn-popover--anchor');
    this.classList.add('corn-pop');
    this.appendChild(popover);
    this._cacheElements();
    this.renderOptions();
    this._addSlotChangeListener();
  }

  renderOptions() {
    const options = this._slot.assignedNodes().filter((node) => node.nodeType === Node.ELEMENT_NODE && node.tagName === 'OPTION');
    const selectOptions = this._popover.querySelector('.corn-select-list');
    selectOptions.innerHTML = '';
    console.log('renderOptions', options, selectOptions);
    options.forEach((option, index) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('corn-checkbox', `corn-checkbox${this._getSizeModifier()}`);
      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('name', `corn-select-${this.controlID}`);
      input.setAttribute('id', `corn-select-${this.controlID}-${index}`);
      input.setAttribute('value', option.value);
      wrapper.appendChild(input);
      const label = document.createElement('label');
      label.setAttribute('for', `corn-select-${this.controlID}-${index}`);
      label.textContent = option.textContent;
      wrapper.appendChild(label);
      selectOptions.appendChild(wrapper);
      //option.replaceWith(wrapper);
      //popover.moveBefore(wrapper, null);
    });
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
   * In this case, when the 'position' attribute changes, it updates the internal _position property and applies the corresponding position class.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') this.value = newValue;
    if (name === 'disabled') this.#internals.ariaDisabled = newValue !== null;
    //if (name === 'required') this.#updateValidity();
    if (name === 'position') {
      this._position = newValue || 'top';
      this._applyPositionClass();
    }
  }

  /**
   * handleEvent is a method that handles events for the popover component.
   * It listens for click and keydown events. When a click event occurs, it calls the _toggle method to open or close the popover.
   * When a keydown event occurs, it calls the _trapFocus method to manage keyboard navigation within the popover. This method allows the component to respond to user interactions and provides accessibility features for keyboard users.
   * By using handleEvent we no longer need to bind the context of the event handlers, as it will automatically use the instance of the class as the context when handling events. This simplifies the code and ensures that the correct context is used when responding to events.
   *
   * @param {*} evt
   */

  handleEvent(evt) {
    switch (evt.type) {
      case 'click':
        console.log('click event', evt);
        // this._popover._toggle(evt);
        // this._toggle(evt);
        break;
      case 'keydown':
        this._trapFocus(evt);
        break;
    }
  }

  _applyPositionClass() {
    const positionClasses = this.positionClasses;

    positionClasses.forEach((position) => {
      this.classList.remove(`${this.classPrefix || 'corn-popover--'}${position}`);
    });

    const position = this._position || 'top';
    this.classList.add(`${this.classPrefix || 'corn-popover--'}${position}`);
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
    // this.trigger?.addEventListener('click', this);
    this.addEventListener('keydown', this);
    this.addEventListener('click', this);

    this._slot.addEventListener('slotchange', this._slotChangeListener);
  }
  _addSlotChangeListener() {
    this._slot.addEventListener('slotchange', this._slotChangeListener);
  }
  _slotChangeListener = (e) => {
    console.log('Slotted light DOM nodes changed:', e.target);
    //this._slot.removeEventListener('slotchange', this._slotChangeListener);
    this.renderOptions();
  };

  _removeSlotChangeListener() {
    this._slot.removeEventListener('slotchange', this._slotChangeListener);
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
    const path = (evt.composedPath ? evt.composedPath() : [evt.target]).filter((node) => node.nodeType === Node.ELEMENT_NODE);
    const insidePopover = path.some((node) => this.contains(node));
    const insideTrigger = path.some((node) => this.trigger?.contains(node));
    if (!insidePopover && !insideTrigger) {
      this._close();
    }
  };

  /**
   * _removeEventListeners is a method that removes the event listeners that were added in the _addEventListeners method. It removes the click event listener from the trigger element and the keydown event listener from the popover itself. It also removes the clickListener from the document to prevent it from listening for clicks when the popover is closed. This cleanup is important to avoid memory leaks and unintended behavior when the component is removed from the DOM or when it is no longer needed.
   */
  _removeEventListeners() {
    this.trigger?.removeEventListener('click', this);
    this.removeEventListener('keydown', this);
    document.removeEventListener('click', this._clickListener);
  }

  /**
   * _toggle is a method that toggles the open state of the popover. If the popover is currently open, it calls the _close method to close it. If the popover is currently closed, it calls the _open method to open it. This method is typically called in response to user interactions, such as clicking the trigger element, allowing users to easily open and close the popover as needed.
   */
  _toggle(evt) {
    if (this.isOpen) {
      this._close();
    } else {
      this._open(evt);
    }
  }

  _getAllListOptions() {
    return Array.from(this._popover.querySelectorAll('input[type="checkbox"]'));
  }
  /**
   * _trapFocus is a method that traps the focus within the popover when it is open.
   * It listens for keydown events and handles the Tab and Shift+Tab keys to ensure that the focus cycles through the focusable elements within the popover.
   * It also listens for the Escape key to close the popover and return focus to the previously active element.
   * @param {KeyboardEvent} evt - The keyboard event object.
   * @returns {void}
   */
  _trapFocus(evt) {
    console.log('trapFocus', evt, 'XXX');
    if (evt.key === 'Tab') {
      if (this._popover.isOpen) {
        evt.preventDefault();
        this._popover._close();
      }
    }
    if (evt.key === ' ' || evt.code === 'Space' || evt.key === 'Enter') {
      evt.preventDefault();
      if (!this._popover.isOpen) {
        this._popover._open(evt);
        evt.preventDefault();
      } else {
        if (document.activeElement.type === 'checkbox') {
          document.activeElement.checked = !document.activeElement.checked;
        }
      }
    }

    if (evt.key !== 'ArrowDown' && evt.key !== 'ArrowUp') return;
    const selectOptions = this._getAllListOptions();
    if (selectOptions.length === 0) return;
    const firstElement = selectOptions[0];
    const lastElement = selectOptions[selectOptions.length - 1];
    if (evt.key === 'ArrowDown') {
      evt.preventDefault();
      if (document.activeElement === lastElement) {
        firstElement.focus();
      } else {
        const currentIndex = selectOptions.indexOf(document.activeElement);
        const nextIndex = (currentIndex + 1) % selectOptions.length;
        selectOptions[nextIndex].focus();
      }
    } else if (evt.key === 'ArrowUp') {
      evt.preventDefault();
      if (document.activeElement === firstElement) {
        lastElement.focus();
      } else {
        const currentIndex = selectOptions.indexOf(document.activeElement);
        const prevIndex = (currentIndex - 1 + selectOptions.length) % selectOptions.length;
        selectOptions[prevIndex].focus();
      }
    }
  }
  /**
   * _cacheElements is a method that caches references to important elements and sets up initial state for the popover.
   * It determines the scroll parent of the popover using the _getScrollParent method, which is important for positioning the popover correctly within the viewport.
   * It also initializes the isOpen property to false and sets up options for an IntersectionObserver, which can be used to monitor the visibility of the popover and adjust its position if it goes out of view.
   * This method is called during the connectedCallback to ensure that all necessary elements and state are set up when the component is added to the DOM.
   */
  _cacheElements() {
    this._popover = this.querySelector('corn-popover');
  }
  get form() {
    return this.#internals.form;
  }
  get name() {
    return this.getAttribute('name');
  }
  get type() {
    return this.localName;
  } // or a custom type
  get validity() {
    return this.#internals.validity;
  }
  get validationMessage() {
    return this.#internals.validationMessage;
  }
  get willValidate() {
    return this.#internals.willValidate;
  }
  // The actual value the form will submit
  get value() {
    return this.#value;
  }
  set value(v) {
    this.#value = v ?? '';
    this.#internals.setFormValue(this.#value); // ← this is what the form sees
    this.#updateValidity();
  }

  /**
   * disconnectedCallback is a lifecycle method that is called when the element is removed from the DOM. In this method, we call _removeEventListeners to clean up any event listeners that were added when the element was connected. This is important to prevent memory leaks and ensure that the component does not continue to respond to events after it has been removed from the DOM.
   * By removing event listeners in the disconnectedCallback, we ensure that the component is properly cleaned up and does not cause unintended side effects in the application after it has been removed.
   * This is a crucial part of managing the lifecycle of custom elements and ensuring that they behave correctly in dynamic applications where elements may be added and removed frequently.
   */
  disconnectedCallback() {
    this._removeEventListeners();
  }
  #updateValidity() {
    const required = this.hasAttribute('required');
    const empty = !this.#value;

    if (required && empty) {
      this.#internals.setValidity({ valueMissing: true }, 'Please fill out this field');
    } else {
      this.#internals.setValidity({}); // clear
    }
  }
}
customElements.define('corn-select', CornSelect);
