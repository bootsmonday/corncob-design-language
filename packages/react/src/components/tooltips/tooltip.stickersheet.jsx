import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornButton, CornTooltip } from '../../index.js';

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <div className="tooltip-demo">
    <h2>Corn Tooltip</h2>

    <h3>Default (Top)</h3>
    <CornButton type="button" className="corn-tooltip--anchor">
      Default (Top)
      <CornTooltip position="top">Default tooltip</CornTooltip>
    </CornButton>

    <h3>Right Position</h3>
    <CornButton type="button" className="corn-tooltip--anchor">
      Right
      <CornTooltip position="right">Right tooltip</CornTooltip>
    </CornButton>

    <h3>Bottom Position</h3>
    <CornButton type="button" className="corn-tooltip--anchor">
      Bottom
      <CornTooltip position="bottom">Bottom tooltip</CornTooltip>
    </CornButton>

    <h3>Left Position</h3>
    <CornButton type="button" className="corn-tooltip--anchor">
      Left
      <CornTooltip position="left">Left tooltip</CornTooltip>
    </CornButton>
  </div>
);
