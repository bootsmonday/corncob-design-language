const template = document.createElement('template');
template.innerHTML = `
  <slot name="details">
    <slot name="summary"></slot>
    <slot></slot>
  </div>
`;

export class CornExpandable extends HTMLElement {
  constructor() {
    // console.log('constructed');
    super(); // 1. Always call super first
    this.isOpen = false;
    this.clicked = false;
    // 2. Create the shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    this._cacheElements();
    this._addEventListeners();
  }
  static get observedAttributes() {
    return ['name'];
  }

  attributeChangeCallback(name, oldValue, newValue) {
    console.log('attribute changed', name, oldValue, newValue);
  }
  singleOpenCallback(mutationsList, observer) {
    let i = 0;
    for (const mutation of mutationsList) {
      i++;

      if (mutation.type === 'attributes') {
        console.log(`${i} The "${mutation.attributeName}" attribute was changed.`);
        console.log('mutation target', mutation.target, mutation.target.hasAttribute('open'));
        if (mutation.target.hasAttribute('open') === false) {
          mutation.target.classList.remove('corn-expandable--open');
        }
        console.log(`${i} The "${mutation.attributeName}" attribute was changed.`);
        console.log(mutation.target.classList);
        // Access the new value: mutation.target.getAttribute(mutation.attributeName)
        // Access the old value if configured: mutation.oldValue
      }
    }
  }
  connectedCallback() {
    this._cacheElements();
    this._addEventListeners();
    this._addAccessiblity();
  }
  _cacheElements() {
    this.details = this.shadowRoot.querySelector('slot[name="details"]').assignedElements()[0];
    this.summary = this.details.querySelector('summary');
    this.content = this.details.querySelector('.corn-expandable--content');
  }
  _addAccessiblity() {}
  _addEventListeners() {
    if (this.details.hasAttribute('name')) {
      const observer = new MutationObserver((mutationsList, observer) =>
        this.singleOpenCallback(mutationsList, observer)
      );
      observer.observe(this.details, {
        attributes: true,
        attributeFilter: ['open'],
      });
    }
    this.summary.addEventListener('click', (evt) => this._toggle(evt));
    this.content.addEventListener('transitionend', (evt) => {
      if (!this.isOpen) {
        this.details.removeAttribute('open');
        this.details.classList.remove('corn-expandable--open');
      }
    });
  }
  _removeEventListeners() {
    // this.parent.removeEventListener('mouseenter', this._showTooltip);
    // this.parent.removeEventListener('mouseleave', this._hideTooltip);
    // // Focus listeners (handles tab navigation)
    // this.parent.removeEventListener('focusin', this._showTooltip);
    // this.parent.removeEventListener('focusout', this._hideTooltip);
  }
  _toggle(evt) {
    console.log('toggling');
    evt.preventDefault();

    return;
    // if (this.details.hasAttribute('open')) {
    //   this.details.classList.remove('corn-expandable--open');
    //   this.isOpen = false;
    // } else {
    //   this.details.setAttribute('open', '');
    //   window.requestAnimationFrame(() => {
    //     this.details.classList.add('corn-expandable--open');
    //   });
    //   this.isOpen = true;
    // }
    // this.clicked = true;
  }
  _positionContent() {}
  _open() {}
  _close() {}
  disconnectedCallback() {}
}
customElements.define('corn-expandable', CornExpandable);
