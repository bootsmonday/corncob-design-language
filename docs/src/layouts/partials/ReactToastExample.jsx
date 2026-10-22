import React, { useRef } from 'react';
import { CornButton, CornToast } from '@bootsmonday/corncob-design-language-react';
import bootstrapIconsSprite from 'bootstrap-icons/bootstrap-icons.svg?url';

function createIcon(iconId) {
  if (typeof document === 'undefined') {
    return null;
  }

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('class', 'corn-icon');
  svg.setAttribute('aria-hidden', 'true');

  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `${bootstrapIconsSprite}#${iconId}`);
  svg.appendChild(use);

  return svg;
}

const iconIds = {
  success: 'check-lg',
  warning: 'exclamation-triangle',
  error: 'x-lg',
  info: 'info-lg',
};

export default function ToastDemo() {
  const toastRef = useRef(null);

  const randomToast = () => {
    const types = ['success', 'warning', 'error', 'info'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    toastRef.current?.addToast({
      type: randomType,
      text: `This is a ${randomType} toast!`,
      icon: createIcon(iconIds[randomType]),
    });
  };

  return (
    <div className="toast-demo">
      <h2>Corn Toast</h2>
      <h3>Default</h3>
      <CornButton type="button" onClick={randomToast}>
        Show Toast
      </CornButton>

      <CornToast ref={toastRef} />
    </div>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
// root.render(<ToastDemo />);
