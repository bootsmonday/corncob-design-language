// Avatar Component JavaScript
export class CobAvatar extends HTMLElement {
  static get observedAttributes() {
    return ['initials', 'src'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const src = this.getAttribute('src');
    const initials = this.getAttribute('initials');

    this.innerHTML = '';

    if (src) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Avatar';
      this.appendChild(img);
    } else if (initials) {
      this.textContent = initials;
    }
  }
}

customElements.define('cob-avatar', CobAvatar);
