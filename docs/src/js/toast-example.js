import bootstrapIconsSprite from 'bootstrap-icons/bootstrap-icons.svg?url';

function createIcon(iconId) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('class', 'corn-icon');
  svg.setAttribute('aria-hidden', 'true');

  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `${bootstrapIconsSprite}#${iconId}`);

  svg.appendChild(use);

  return svg;
}

function getIcons() {
  return {
    success: createIcon('check-lg'),
    warning: createIcon('exclamation-triangle'),
    error: createIcon('x-lg'),
    info: createIcon('info-lg'),
  };
}

export function randomToast() {
  if (typeof document === 'undefined') {
    return;
  }

  const types = ['success', 'warning', 'error', 'info'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const icons = getIcons();
  const toast = document.querySelector('.corn-toast');

  if (!toast) {
    return;
  }

  toast.addToast({
    type: randomType,
    text: `This is a ${randomType} toast!`,
    icon: icons[randomType],
  });
}
