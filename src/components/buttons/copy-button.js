const template = document.createElement('template');

export class CornCopyButton extends HTMLElement {
  /**
   * Observed attributes for the copy button.
   * When any of these attributes change, the component will update its internal state and re-cache the target element and messages.
   */
  static get observedAttributes() {
    return ['copyselector', 'copysuccess', 'copyfailure'];
  }

  /**
   *
   * Called when one of the observed attributes changes.
   * It re-caches the elements and messages based on the new attribute values.
   * @param {*} name
   * @param {*} oldValue
   * @param {*} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'copyselector' && newValue !== oldValue && newValue) {
      this._copyTarget = document.querySelector(newValue);
    }
  }

  /**
   * Called when the component is added to the DOM.
   * It finds the closest anchor element, caches the necessary elements and messages, and adds event listeners for the copy functionality.
   */
  connectedCallback() {
    console.log('is connected to the DOM', this.isConnected);
    this._cacheElements();
    this._addEventListeners();
  }
  /**
   *
   * Handles the click event on the copy button.
   * It attempts to copy the text content of the target element to the clipboard and updates the message based on success or failure.
   * @param {Event} evt
   * @returns
   */
  _copyToClipboard = (evt) => {
    // If no target element is found, display the failure message and exit
    if (!this._copyTarget) {
      this._copyMessage.textContent =
        this._copyfailure || `No element found with selector ${this._copyselector}`;
      return;
    }

    // Check if the Clipboard API is supported
    if (!navigator?.clipboard) {
      this._copyMessage.textContent = this._copyfailure || 'Clipboard API not supported';
      return;
    }

    navigator.clipboard.writeText(this._copyTarget.textContent).then(
      () => {
        this._copyMessage.textContent = this._copysuccess || 'Text copied to clipboard';
        evt.target.classList.add('corn-copied');
        setTimeout(() => {
          evt.target.classList.remove('corn-copied');
          //this._copyMessage.textContent = '';
        }, 500);
      },
      (err) => {
        this._copyMessage.textContent = this._copyfailure || 'Failed to copy';
      }
    );
  };

  /**
   * Adds a click event listener to the copy button that triggers the copy to clipboard functionality.
   * Also adds a class to the button when the text is successfully copied, which can be used for styling purposes.
   */
  _addEventListeners() {
    this.addEventListener('click', this._copyToClipboard);
  }

  /**
   * Removes the click event listener from the copy button. This is important to prevent memory leaks when the component is removed from the DOM.
   * It ensures that the event listener is properly cleaned up when the component is disconnected.
   */
  _removeEventListeners() {
    this.removeEventListener('click', this._copyToClipboard);
  }

  /**
   * Caches the necessary elements and messages based on the current attributes of the component.
   * It retrieves the target element to copy from using the `copyselector` attribute and stores the success and failure messages for later use.
   * This method is called whenever the observed attributes change or when the component is first connected to the DOM.
   * It ensures that the component always has the correct target element and messages based on its current configuration.
   */
  _cacheElements() {
    this._copyMessage = this.querySelector('[role="status"]');
    console.log('copy message element', this._copyMessage);
  }

  /**
   * Called when the component is removed from the DOM.
   * It removes the event listeners to prevent memory leaks and ensure that the component is properly cleaned up.
   * This method is important for maintaining the performance and stability of the application, especially if multiple instances of the copy button are used or if the component is frequently added and removed from the DOM.
   * It ensures that there are no lingering event listeners that could cause unexpected behavior or memory issues.
   */
  disconnectedCallback() {
    this._removeEventListeners();
  }
}
customElements.define('corn-copy-button', CornCopyButton);
