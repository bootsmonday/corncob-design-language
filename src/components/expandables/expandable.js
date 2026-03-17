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

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangeCallback(name, oldValue, newValue) {
    console.log('attribute changed', name, oldValue, newValue);
  }
  connectedCallback() {
    this._cacheElements();
    this._addEventListeners();
  }
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
  _addEventListeners() {
    this.content.addEventListener('transitioncancel', (evt) => {
      if (evt.propertyName !== 'grid-template-rows') return;
      if (this.details.open && !this.details.classList.contains('corn-expandable--open')) {
        this.details.open = false;
      } else if (!this.details.open && this.details.classList.contains('corn-expandable--open')) {
        this.details.classList.remove('corn-expandable--open');
      }
    });
    this.summary.addEventListener('click', (evt) => this._toggle(evt));
  }
  _removeEventListeners() {
    // this.parent.removeEventListener('mouseenter', this._showTooltip);
    // this.parent.removeEventListener('mouseleave', this._hideTooltip);
    // // Focus listeners (handles tab navigation)
    // this.parent.removeEventListener('focusin', this._showTooltip);
    // this.parent.removeEventListener('focusout', this._hideTooltip);
  }
  _toggle(evt) {
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
  }
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
  disconnectedCallback() {}
}
customElements.define('corn-expandable', CornExpandable);
