class CornCheckbox extends HTMLElement {
  static formAssociated = true; // Declare as form-associated custom element

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Use open shadow DOM
    this._internals = this.attachInternals(); // Get element internals
    this.shadowRoot.innerHTML = `
      <style>
        /* Hide the native input visually, but keep it for accessibility */
        input[type="checkbox"] {
          /* Position it absolutely, make it full size, but transparent and with a low z-index */
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          margin: 0;
        }

        /* Style the custom visual representation using a pseudo-element on a wrapper/span */
        .checkbox-custom {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid var(--checkbox-border-color, #8b8c89);
          border-radius: 4px;
          position: relative;
          vertical-align: middle;
        }

        /* Add a custom checkmark when the internal input is checked */
        input[type="checkbox"]:checked + .checkbox-custom::after {
          content: '✔'; /* Use a checkmark or a custom image */
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: var(--checkbox-checked-color, #274c77);
          font-size: 14px;
        }

        /* Handle focus states for keyboard accessibility */
        input[type="checkbox"]:focus + .checkbox-custom {
          outline: 2px solid var(--checkbox-focus-color, #a3cef1);
        }
      </style>
      <label>
        <input type="checkbox" id="checkbox-input" />
        <span class="checkbox-custom"></span>
        <slot></slot> <!-- Used for projecting the label text from light DOM -->
      </label>
    `;
    // Bind change event to update the form data
    this.shadowRoot.querySelector('input').addEventListener('change', this._updateState.bind(this));
  }

  // Reflect the 'checked' attribute/property
  get checked() {
    return this.shadowRoot.querySelector('input').checked;
  }

  set checked(value) {
    this.shadowRoot.querySelector('input').checked = value;
    this._updateState();
  }

  // Update the form data when the state changes
  _updateState() {
    const checkbox = this.shadowRoot.querySelector('input');
    this._internals.setFormValue(checkbox.checked ? this.value || 'on' : '');
    this.setAttribute('aria-checked', checkbox.checked); // Use aria-checked for custom elements
  }

  // Define what attributes to monitor for changes
  static get observedAttributes() {
    return ['checked', 'disabled', 'value'];
  }

  // Sync attributes with internal input
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'checked') {
      this.checked = newValue !== null;
    } else if (name === 'disabled') {
      this.shadowRoot.querySelector('input').disabled = newValue !== null;
      this.setAttribute('aria-disabled', newValue !== null);
    } else if (name === 'value') {
      this.shadowRoot.querySelector('input').value = newValue;
      this._updateState(); // Update form value if the value attribute changes
    }
  }
}

// Define the new custom element
customElements.define('corn-checkbox', CornCheckbox);
