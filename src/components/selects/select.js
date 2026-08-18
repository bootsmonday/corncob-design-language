/**
 * CornSelect is a custom HTML element that represents a select dropdown component with support for multiple selections.
 * It extends the HTMLElement class and implements the FormAssociated interface, allowing it to be used in forms and participate in form submission.
 * The component uses a popover to display the list of options, and it supports keyboard navigation and accessibility features.
 * It also observes changes to its light DOM children (option elements) and updates its internal state accordingly.
 * The component can be configured with attributes such as 'multiple', 'required', and 'disabled' to control its behavior.
 * The CornSelect component is designed to be used in web applications where a custom select dropdown is needed, providing a more flexible and customizable alternative to the native HTML select element.
 * It is part of the Corncob Design Language, which provides a set of reusable UI components for building web applications.
 *
 * @class CornSelect
 * @extends HTMLElement
 * @implements FormAssociated
 * @example
 * <corn-select name="my-select" multiple required>
 *   <option value="option1">Option 1</option>
 *   <option value="option2">Option 2</option>
 *   <option value="option3">Option 3</option>
 * </corn-select>
 */

export class CornSelect extends HTMLElement {
  static formAssociated = true;
  #internals;
  #value = [];
  #observer = null;
  #isRendering = false;
  #list = null;

  /**
   * constructor initializes the CornSelect component, setting up its internal state and attributes. It generates a unique identifier for the component instance, attaches the FormAssociated internals, and sets ARIA attributes for accessibility. The constructor also sets the tabindex to make the component focusable.
   */
  constructor() {
    super();
    // this value
    this.uuid = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).substr(2, 9);
    this.id = this.id || `corn-select-${this.uuid}`;

    this.#internals = this.attachInternals();
    this.setAttribute('role', 'combobox');
    this.setAttribute('aria-haspopup', 'listbox');
    this.setAttribute('aria-expanded', 'false');
    this.setAttribute('tabindex', '0');
  }

  /**
   * connectedCallback is a lifecycle method that is called when the element is added to the DOM. In this method, we call the render method to set up the initial structure of the component, and we create a MutationObserver to watch for changes in the light DOM children (option elements). When changes are detected, we re-render the component to reflect the updated options. We also set up event listeners for user interactions with the component.
   */
  connectedCallback() {
    this.render();
    this.#observer = new MutationObserver((mutationlist) => {
      console.log('MutationObserver triggered for <corn-select> light DOM changes', this.#isRendering, mutationlist);
      if (this.#isRendering) return;
      this.render();
    });

    this.connectObserver();
    this._addEventListeners();
  }

  /**
   * connectObserver is a method that sets up the MutationObserver to observe changes in the light DOM children of the CornSelect component. It configures the observer to watch for changes in child elements, attributes, and specific attribute filters (value, disabled, selected, label, multiple). When changes are detected, the observer will trigger a callback to re-render the component and update its internal state accordingly. This ensures that the component remains in sync with its light DOM children and reflects any changes made to the option elements.
   * The connectObserver method is called during the connectedCallback to ensure that the observer is set up when the component is added to the DOM.
   */
  connectObserver() {
    this.#observer?.observe(this, {
      childList: true,
      subtree: false,
      attributes: true,
      attributeFilter: ['value', 'disabled', 'selected', 'label', 'multiple'],
    });
  }
  /**
   * _getSizeModifier is a method that determines the size modifier for the CornSelect component based on the class names of its parent element. It checks for specific size modifiers (--xs, --sm, --md, --lg, --xl) in the parent's class list and returns the first matching modifier. If no size modifier is found, it defaults to '--md'. This method allows the component to adapt its appearance based on the size specified by its parent element's classes.
   *
   */
  _getSizeModifier() {
    const sizeModifiers = ['--xs', '--sm', '--md', '--lg', '--xl'];
    const classList = Array.from(this.parentNode.classList);
    const sizeModifier = sizeModifiers.find((modifier) => classList.some((className) => className.includes(modifier))) || '--md';
    return sizeModifier || '--md';
  }

  /**
   * _updateCheckboxes is a method that updates the state of the checkboxes in the CornSelect component when a user interacts with them. It retrieves all checkbox options and checks if the component has the 'multiple' attribute. If it does not, it ensures that only one checkbox can be selected at a time by unchecking all other checkboxes when one is checked. It then collects the values of all checked checkboxes and updates the component's value property with a comma-separated string of the selected values. This method is called whenever a checkbox is clicked, ensuring that the component's state remains consistent with user interactions.
   * @param {Event} evt - The event object representing the user interaction with a checkbox.
   */
  _updateCheckboxes(evt) {
    const checkboxes = this._getAllListOptions();
    const isMultiple = this.hasAttribute('multiple');

    if (!isMultiple) {
      checkboxes.forEach((checkbox) => {
        if (checkbox !== evt.target) {
          checkbox.checked = false;
        }
      });
    }

    const selectedValues = checkboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
    this.value = selectedValues.join(', ');
  }

  /**
   * _updateDisplayValue is a method that updates the display value of the CornSelect component based on the currently selected checkboxes. It retrieves all checked checkboxes, collects their values, and joins them into a comma-separated string. This string is then set as the text content of the display value element. If no checkboxes are selected, it displays a placeholder text or a default message. This method ensures that the user sees an accurate representation of their selections in the component's UI.
   * It is called whenever the selection changes, ensuring that the display value remains in sync with the user's choices.
   */
  _updateDisplayValue() {
    const selectedOptions = [...this.querySelectorAll('input[type="checkbox"]:checked')];
    console.log('Selected options:', selectedOptions);
    const displayText = selectedOptions.map((option) => option.value).join(', ');
    this._displayValue.innerHTML = `<div class="select-content">${displayText || this.getAttribute('placeholder')}</div>`;
  }

  /**
   * render is a method that sets up the initial structure and content of the CornSelect component. It creates a display value element to show the selected options, initializes a popover for the list of options, and generates checkbox inputs for each option in the light DOM. The method also sets up event listeners and connects the MutationObserver to watch for changes in the light DOM. This method is called when the component is first added to the DOM and whenever changes are detected in the light DOM children (option elements). It ensures that the component's UI reflects its current state and provides an interactive experience for users.
   */
  render() {
    console.log('Rendering <corn-select> component...', this.getAttribute('multiple'));
    this._displayValue = document.createElement('div');
    this._displayValue.classList.add('corn-select--value');
    this.appendChild(this._displayValue);

    this.#isRendering = true;
    this.#observer?.disconnect();
    this._popover = document.createElement('corn-popover');
    this._popover.setAttribute('id', `popover-${this.uuid}`);
    this._popover.setAttribute('position', 'bottom');
    this._popover.setAttribute('role', 'listbox');
    this._popover.classList.add('corn-popover');
    this.setAttribute('aria-controls', this._popover.id);
    this.parentNode.classList.add('corn-popover--anchor');
    this.classList.add('corn-pop');
    const fieldSet = document.createElement('fieldset');
    fieldSet.classList.add('corn-form--item', 'corn-checkbox-group');
    const options = [...this.querySelectorAll(':scope > option')];
    options.forEach((option, index) => {
      option.hidden = true;
      const wrapper = document.createElement('div');
      wrapper.classList.add('corn-checkbox', `corn-checkbox${this._getSizeModifier()}`);
      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('name', `corn-select-${this.uuid}`);
      input.setAttribute('id', `corn-select-${this.uuid}-${index}`);
      input.setAttribute('value', option.value);
      if (index === 0) input.setAttribute('checked', 'checked');
      wrapper.appendChild(input);
      const label = document.createElement('label');
      label.setAttribute('for', `corn-select-${this.uuid}-${index}`);
      label.textContent = option.textContent;
      wrapper.appendChild(label);
      fieldSet.appendChild(wrapper);
    });
    this._popover.appendChild(fieldSet);
    this.appendChild(this._popover);
    this.#isRendering = false;
    this._updateDisplayValue();
    this.connectObserver();
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
      case 'change':
        console.log('Change event detected in <corn-select> component:', evt.target);
        // Only react to checkboxes that live inside our popover
        if (evt.target.type === 'checkbox' && this._popover?.contains(evt.target)) {
          this._updateCheckboxes(evt); // this already does → this.value = ...
          this._updateDisplayValue();

          // Fire a change event on the host (mimics native <select>)
          this.dispatchEvent(
            new Event('change', {
              bubbles: true,
              composed: true,
            })
          );

          // Close if single-select
          if (!this.hasAttribute('multiple')) {
            this._popover._close?.();
          }
        }
        break;
      case 'click':
        if (evt.target.tagName === 'INPUT' && evt.target.type === 'checkbox') {
          this._updateCheckboxes(evt);
          if (this.getAttribute('multiple') === null) {
            this._popover._close();
          }
          this._updateDisplayValue();
        }
        break;
      case 'keydown':
        this._trapFocus(evt);
        break;
      default:
        break;
    }
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
    this.addEventListener('change', this);
    this.addEventListener('keydown', this);
    this.addEventListener('click', this);
  }

  /**
   * _removeEventListeners is a method that removes the event listeners that were added in the _addEventListeners method. It removes the click event listener from the trigger element and the keydown event listener from the popover itself. It also removes the clickListener from the document to prevent it from listening for clicks when the popover is closed. This cleanup is important to avoid memory leaks and unintended behavior when the component is removed from the DOM or when it is no longer needed.
   */
  _removeEventListeners() {
    this.removeEventListener('change', this);
    this.removeEventListener('keydown', this);
    this.removeEventListener('click', this);
  }

  /*
   * _getAllListOptions is a method that retrieves all checkbox input elements within the popover. It uses the querySelectorAll method to select all input elements of type "checkbox" and converts the NodeList to an array using Array.from. This allows for easy manipulation and iteration over the list of checkbox options. The method is used to manage the state of the checkboxes and update the component's value based on user interactions.
   * @returns {Array} An array of checkbox input elements within the popover.
   */
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
    if (evt.key === 'Tab') {
      if (this._popover.isOpen) {
        evt.preventDefault();
        this._popover._close();
      }
    }
    if (evt.key === ' ' || evt.code === 'Space' || evt.key === 'Enter') {
      console.log('Space or Enter pressed on <corn-select> component', evt.target);
      // evt.preventDefault();
      // evt.target;
      if (!this._popover.isOpen) {
        this._popover._open(evt);
        evt.preventDefault();
      }
      // else {
      //   if (document.activeElement.type === 'checkbox') {
      //     document.activeElement.checked = !document.activeElement.checked;
      //   }
      // }
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
   * The following getter methods provide access to the form-associated properties of the CornSelect component. These properties allow the component to participate in form submission and validation, making it behave like a native form control.
   */
  get form() {
    return this.#internals.form;
  }

  /**
   * The name getter returns the value of the 'name' attribute of the CornSelect component. This is important for form submission, as it determines the key under which the component's value will be submitted in the form data. If the 'name' attribute is not set, this getter will return null.
   */
  get name() {
    return this.getAttribute('name');
  }

  /**
   * The type getter returns the local name of the CornSelect component, which is 'corn-select'. This is used to identify the type of the form control when it is submitted as part of a form. It can also be overridden to provide a custom type if needed.
   */
  get type() {
    return this.localName;
  }

  /**
   * The following getter methods provide access to the validity state of the CornSelect component, allowing it to participate in form validation. These properties are part of the FormAssociated interface and enable the component to report its validity status, validation messages, and whether it will be validated as part of a form submission.
   */
  get validity() {
    return this.#internals.validity;
  }

  /**
   * The validationMessage getter returns the validation message associated with the CornSelect component. This message is generated based on the component's validity state and can be used to provide feedback to the user when the component is invalid. If the component is valid, this getter will return an empty string.
   */
  get validationMessage() {
    return this.#internals.validationMessage;
  }

  /**
   * The willValidate getter returns a boolean indicating whether the CornSelect component will be validated when the form is submitted. This is determined by the component's attributes and validity state. If the component has the 'required' attribute or other validation constraints, this getter will return true, indicating that it will be validated as part of the form submission process.
   */
  get willValidate() {
    return this.#internals.willValidate;
  }

  /**
   * The value getter and setter allow access to the current value of the CornSelect component. The getter returns the internal value, while the setter updates the internal value and sets the form value using the FormAssociated internals. It also calls the #updateValidity method to ensure that the component's validity state is updated based on the new value. This allows the component to participate in form submission and validation, ensuring that its value is correctly represented in the form data.
   */
  get value() {
    return this.#value;
  }

  /**
   * The value setter updates the internal value of the CornSelect component and sets the form value using the FormAssociated internals. It also calls the #updateValidity method to ensure that the component's validity state is updated based on the new value. This allows the component to participate in form submission and validation, ensuring that its value is correctly represented in the form data.
   */
  set value(v) {
    console.log('Setting value for <corn-select> component:', v);
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

  /**
   * #updateValidity is a private method that updates the validity state of the CornSelect component based on its current value and attributes. It checks if the component has the 'required' attribute and whether its value is empty. If the component is required and has no value, it sets a custom validity state indicating that the value is missing and provides a validation message. If the component is valid, it clears any existing validity state. This method ensures that the component's validity state accurately reflects its current state and allows it to participate in form validation.
   * The #updateValidity method is called whenever the value of the component changes, ensuring that the validity state is always up to date and consistent with the component's attributes and user interactions.
   */
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
