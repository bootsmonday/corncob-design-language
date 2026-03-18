// Textarea Component JavaScript
export class CobTextarea extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'maxlength'];
  }

  connectedCallback() {
    this.textarea = this.querySelector('textarea');
    if (this.textarea) {
      this.textarea.addEventListener('input', () => this.updateCharCount());
    }
  }

  getValue() {
    return this.textarea?.value || '';
  }

  setValue(value) {
    if (this.textarea) {
      this.textarea.value = value;
      this.updateCharCount();
    }
  }

  updateCharCount() {
    const maxlength = this.textarea?.maxLength || this.getAttribute('maxlength');
    if (maxlength && maxlength > 0) {
      const count = this.textarea?.value.length || 0;
      let charCount = this.querySelector('.cob-textarea__char-count');

      if (!charCount) {
        charCount = document.createElement('div');
        charCount.className = 'cob-textarea__char-count';
        this.appendChild(charCount);
      }

      charCount.textContent = `${count}/${maxlength}`;

      if (count >= maxlength) {
        charCount.classList.add('cob-textarea__char-count--limit-reached');
      } else {
        charCount.classList.remove('cob-textarea__char-count--limit-reached');
      }
    }
  }
}

customElements.define('cob-textarea', CobTextarea);
