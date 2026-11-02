import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornToggle, CornToggleGroup } from '../../index.js';

function createIcon(iconId, label) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon" aria-label={label}>
      <use href={`/node_modules/bootstrap-icons/bootstrap-icons.svg#${iconId}`}></use>
    </svg>
  );
}

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));

root.render(
  <div className="toggle-demo">
    <h2>Toggles</h2>

    <h3>Toggles - XS</h3>
    <CornToggleGroup legend="Group Label" name="example-xs" size="xs">
      <CornToggle value="one" defaultChecked>
        One
      </CornToggle>
      <CornToggle value="two">Two</CornToggle>
    </CornToggleGroup>

    <h3>Toggles - SM</h3>
    <CornToggleGroup legend="Group Label" name="example-sm" size="sm">
      <CornToggle value="one" defaultChecked>
        One
      </CornToggle>
      <CornToggle value="two">Two</CornToggle>
    </CornToggleGroup>

    <h3>Toggles - MD</h3>
    <CornToggleGroup legend="Group Label" name="example-md" size="md">
      <CornToggle value="one" defaultChecked>
        One
      </CornToggle>
      <CornToggle value="two">Two</CornToggle>
      <CornToggle value="three">Three</CornToggle>
    </CornToggleGroup>

    <h3>Toggles - LG</h3>
    <CornToggleGroup legend="Group Label" name="example-lg" size="lg">
      <CornToggle value="one">One</CornToggle>
      <CornToggle value="two" defaultChecked>
        Two
      </CornToggle>
    </CornToggleGroup>

    <h3>Toggles - XL</h3>
    <CornToggleGroup legend="Group Label" name="example-xl" size="xl">
      <CornToggle value="one">One</CornToggle>
      <CornToggle value="two" defaultChecked>
        Two
      </CornToggle>
    </CornToggleGroup>

    <h3>Disabled</h3>
    <CornToggleGroup legend="Group Label" name="example-disabled" size="sm">
      <CornToggle value="one" defaultChecked disabled>
        One
      </CornToggle>
      <CornToggle value="two" disabled>
        Two
      </CornToggle>
    </CornToggleGroup>

    <h2>Icon Toggles</h2>

    <h3>Toggles - MD</h3>
    <CornToggleGroup legend="Group Label" name="example-icons-md" size="md">
      <CornToggle value="lock" defaultChecked>
        {createIcon('lock', 'Lock')}
      </CornToggle>
      <CornToggle value="unlock">{createIcon('unlock', 'Unlock')}</CornToggle>
      <CornToggle value="smile">{createIcon('emoji-smile', 'Smile')}</CornToggle>
    </CornToggleGroup>
  </div>
);
