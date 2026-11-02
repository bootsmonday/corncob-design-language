import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornButton, CornButtonBar } from '../../index.js';

function BasicButtonBar() {
  const labels = ['Button 1', 'Button 2', 'Button 3', 'Button 4', 'Button 5', 'Button 6', 'Button 7', 'Button 8'];

  return (
    <CornButtonBar>
      {labels.map((label, index) => (
        <CornButton key={label} size={index === 1 ? 'sm' : 'xs'} type="button">
          {label}
        </CornButton>
      ))}
    </CornButtonBar>
  );
}

function ComplexButtonBar() {
  return (
    <CornButtonBar className="corn-button-bar--toolbar">
      <CornButton size="xs" type="button">
        Button 1
      </CornButton>
      <CornButton size="sm" type="button">
        Button 2
      </CornButton>
      <CornButton size="xs" type="button">
        Button 3
      </CornButton>
      <CornButton size="xs" type="button">
        Button 4
      </CornButton>
      <CornButton size="xs" type="button">
        Button 5
      </CornButton>
      <CornButton size="xs" type="button">
        Button 6
      </CornButton>

      <div className="corn-popover--anchor">
        <button className="corn-button corn-pop corn-button--xs" aria-controls="nest-popover-bottom" type="button">
          Popover
        </button>
        <corn-popover position="bottom" id="nest-popover-bottom" className="corn-popover">
          <ul>
            <li>
              <a href="#">Item 1</a>
            </li>
            <li>
              <a href="#">Item 2</a>
            </li>
            <li>
              <a href="#">Item 3</a>
            </li>
          </ul>
        </corn-popover>
      </div>

      <CornButton size="xs" type="button">
        Button 8
      </CornButton>

      <button className="corn-button corn-button--icon corn-button--xs" aria-label="More" slot="more-button" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon" aria-hidden="true">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#three-dots" fill="currentColor"></use>
        </svg>
      </button>
    </CornButtonBar>
  );
}

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <div className="buttonbar-demo" style={{ maxWidth: '500px' }}>
    <h2>Corn Button Bar</h2>

    <h3>Basic Button Bar</h3>
    <BasicButtonBar />

    <hr />

    <h3>Complex Button Bar</h3>
    <ComplexButtonBar />
  </div>
);
