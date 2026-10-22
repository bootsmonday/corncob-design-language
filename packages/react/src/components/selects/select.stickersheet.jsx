import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornSelect, CornSelectOption } from '../../index.js';

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));

root.render(
  <div className="select-demo">
    <h2>Corn Select</h2>

    <h3>Default</h3>
    <CornSelect id="select-default" label="Flavor" name="flavor" placeholder="Choose a flavor">
      <CornSelectOption value="vanilla">Vanilla</CornSelectOption>
      <CornSelectOption value="chocolate">Chocolate</CornSelectOption>
      <CornSelectOption value="strawberry">Strawberry</CornSelectOption>
    </CornSelect>

    <h3>Small</h3>
    <CornSelect id="select-small" name="size" label="Size" size="sm" placeholder="Choose a size">
      <CornSelectOption value="xs">XS</CornSelectOption>
      <CornSelectOption value="sm">SM</CornSelectOption>
      <CornSelectOption value="md">MD</CornSelectOption>
      <CornSelectOption value="lg">LG</CornSelectOption>
    </CornSelect>

    <h3>Multiple</h3>
    <CornSelect id="select-multiple" name="colors" label="Colors" multiple placeholder="Choose colors">
      <CornSelectOption value="red">Red</CornSelectOption>
      <CornSelectOption value="green">Green</CornSelectOption>
      <CornSelectOption value="blue">Blue</CornSelectOption>
      <CornSelectOption value="purple">Purple</CornSelectOption>
    </CornSelect>
  </div>
);
