import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornCheckbox, CornCheckboxGroup } from '../../index.js';

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <div class="checkbox-demo">
    <h2>Checkboxes</h2>
    <section id="checkboxes">
      <h3>Checkboxes</h3>
      <CornCheckboxGroup legend="Group Label" name="example">
        <CornCheckbox indeterminate>Indeterminate checkbox</CornCheckbox>
        <hr />
        <CornCheckbox size="xs">Checkbox One xs</CornCheckbox>
        <CornCheckbox size="sm">Checkbox Two sm</CornCheckbox>
        <CornCheckbox size="md">Checkbox Default md </CornCheckbox>
        <CornCheckbox size="lg">Checkbox 4 lg</CornCheckbox>
        <CornCheckbox size="xl" defaultChecked>
          Checkbox 5 xl
        </CornCheckbox>
        <CornCheckbox>Checkbox Six...</CornCheckbox>
      </CornCheckboxGroup>
    </section>

    <hr />

    <section id="checkboxes-inline">
      <h3>Inline Checkboxes</h3>
      <CornCheckboxGroup legend="Group Label" name="example-inline" inline>
        <CornCheckbox>Checkbox One...</CornCheckbox>
        <CornCheckbox>Checkbox Two...</CornCheckbox>
        <CornCheckbox>Checkbox Three...</CornCheckbox>
        <CornCheckbox>Checkbox Four...</CornCheckbox>
        <CornCheckbox defaultChecked>Checkbox Five...</CornCheckbox>
        <CornCheckbox>Checkbox Six...</CornCheckbox>
        <CornCheckbox>Checkbox Seven...</CornCheckbox>
      </CornCheckboxGroup>
    </section>

    <hr />

    <section id="task-checkboxes">
      <h3>Task Checkboxes</h3>
      <CornCheckboxGroup legend="Group Label" name="example-task">
        <CornCheckbox task defaultChecked>
          Task Complete
        </CornCheckbox>
        <CornCheckbox task>Task Complete</CornCheckbox>
        <CornCheckbox task>Task Complete</CornCheckbox>
      </CornCheckboxGroup>
    </section>
  </div>
);
