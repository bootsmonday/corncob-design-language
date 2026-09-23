import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { CornButton, CornToast } from '../../index.js';

function createIcon(iconId) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('class', 'corn-icon');
  svg.setAttribute('aria-hidden', 'true');

  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `/node_modules/bootstrap-icons/bootstrap-icons.svg#${iconId}`);
  svg.appendChild(use);

  return svg;
}

const icons = {
  success: createIcon('check-lg'),
  warning: createIcon('exclamation-triangle'),
  error: createIcon('x-lg'),
  info: createIcon('info-lg'),
};

function ToastDemo() {
  const toastRef = useRef(null);

  const randomToast = () => {
    const types = ['success', 'warning', 'error', 'info'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    toastRef.current?.addToast({
      type: randomType,
      text: `This is a ${randomType} toast!`,
      icon: icons[randomType],
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

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(<ToastDemo />);
