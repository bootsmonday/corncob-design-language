import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornExpandable, CornAccordion } from '../../index.js';

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <div className="expandables-demo">
    <h2>Corn Expandables</h2>

    <h3>Default</h3>
    <CornExpandable summary="Summary">
      <div>
        <h3>heading</h3>
        <div>content</div>
      </div>
    </CornExpandable>

    <h4>Start Open</h4>
    <CornExpandable summary="Summary" open>
      <div>
        <h3>heading</h3>
        <div>content</div>
      </div>
    </CornExpandable>

    <hr />
    <CornExpandable summary="Summary 2">details 2</CornExpandable>

    <hr />
    <CornExpandable summary="Summary 3">details</CornExpandable>

    <h3>Accordion Single Open</h3>
    <CornAccordion>
      <CornExpandable name="corn-single" summary="Summary">
        details
      </CornExpandable>
      <CornExpandable name="corn-single" summary="Summary 2">
        details 2
      </CornExpandable>
      <CornExpandable name="corn-single" summary="Summary 3">
        details
      </CornExpandable>
    </CornAccordion>

    <hr />

    <h3>Nested expandable</h3>
    <CornExpandable className="corn-tree-view" summary="Summary" iconPosition="start">
      <CornExpandable className="corn-tree-view" summary="Summary 2" iconPosition="start">
        More details
      </CornExpandable>
    </CornExpandable>
  </div>
);
