import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornPanel } from '../../index.js';

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <CornPanel>
    <h2>Corn Panel</h2>
    <CornPanel>
      <h3>Nested Corn Panel</h3>
    </CornPanel>
  </CornPanel>
);
