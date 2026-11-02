import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornRadioButton, CornRadioButtonGroup } from '../../index.js';

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <div className="radio-button-demo">
    <h2>Radio Buttons</h2>
    <section id="radio-buttons">
      <h3>Radio Buttons</h3>
      <CornRadioButtonGroup legend="Group Label" name="example">
        <CornRadioButton size="xs">Radio One xs</CornRadioButton>
        <CornRadioButton size="sm">Radio Two sm</CornRadioButton>
        <CornRadioButton size="md">Radio Default md </CornRadioButton>
        <CornRadioButton size="lg">Radio 4 lg</CornRadioButton>
        <CornRadioButton size="xl" defaultChecked>
          Radio 5 xl
        </CornRadioButton>
        <CornRadioButton>Radio Six...</CornRadioButton>
      </CornRadioButtonGroup>
    </section>

    <hr />

    <section id="radio-buttons-inline">
      <h3>Inline Radio Buttons</h3>
      <CornRadioButtonGroup legend="Group Label" name="example-inline" inline>
        <CornRadioButton>Radio One...</CornRadioButton>
        <CornRadioButton>Radio Two...</CornRadioButton>
        <CornRadioButton>Radio Three...</CornRadioButton>
        <CornRadioButton>Radio Four...</CornRadioButton>
        <CornRadioButton defaultChecked>Radio Five...</CornRadioButton>
        <CornRadioButton>Radio Six...</CornRadioButton>
        <CornRadioButton>Radio Seven...</CornRadioButton>
      </CornRadioButtonGroup>
    </section>

    <hr />
  </div>
);
