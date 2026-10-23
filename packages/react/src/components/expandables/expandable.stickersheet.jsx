import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornExpandable, CornAccordion, CornExpandableSummary, CornExpandableContent } from '../../index.js';
function SummaryIcon({ icon }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon" aria-hidden="true">
      <use href={`/node_modules/bootstrap-icons/bootstrap-icons.svg#${icon}`}></use>
    </svg>
  );
}
const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <div className="expandables-demo">
    <h2>Corn Expandables</h2>

    <h3>Default</h3>
    <CornExpandable>
      <CornExpandableSummary>
        Summary <SummaryIcon icon="chevron-right" />
      </CornExpandableSummary>
      <CornExpandableContent>
        <div>
          <h3>heading</h3>
          <div>content</div>
        </div>
      </CornExpandableContent>
    </CornExpandable>

    <h4>Start Open</h4>
    <CornExpandable open>
      <CornExpandableSummary>
        Summary
        <SummaryIcon icon="chevron-right" />
      </CornExpandableSummary>
      <CornExpandableContent>
        <div>
          <h3>heading</h3>
          <div>content</div>
        </div>
      </CornExpandableContent>
    </CornExpandable>

    <hr />
    <CornExpandable>
      <CornExpandableSummary>
        Summary 2<SummaryIcon icon="chevron-right" />
      </CornExpandableSummary>
      <CornExpandableContent>details 2</CornExpandableContent>
    </CornExpandable>

    <hr />
    <CornExpandable>
      <CornExpandableSummary>
        Summary 3<SummaryIcon icon="chevron-right" />
      </CornExpandableSummary>
      <CornExpandableContent>details</CornExpandableContent>
    </CornExpandable>

    <h3>Accordion Single Open</h3>
    <CornAccordion>
      <CornExpandable name="corn-single">
        <CornExpandableSummary>
          Summary <SummaryIcon icon="chevron-right" />
        </CornExpandableSummary>
        <CornExpandableContent>details</CornExpandableContent>
      </CornExpandable>
      <CornExpandable name="corn-single">
        <CornExpandableSummary>
          Summary 2 <SummaryIcon icon="chevron-right" />
        </CornExpandableSummary>
        <CornExpandableContent>details 2</CornExpandableContent>
      </CornExpandable>
      <CornExpandable name="corn-single">
        <CornExpandableSummary>
          Summary 3 <SummaryIcon icon="chevron-right" />
        </CornExpandableSummary>
        <CornExpandableContent>details</CornExpandableContent>
      </CornExpandable>
    </CornAccordion>

    <hr />

    <h3>Nested expandable</h3>
    <CornExpandable className="corn-tree-view">
      <CornExpandableSummary>
        <SummaryIcon icon="chevron-right" />
        Summary
      </CornExpandableSummary>
      <CornExpandableContent>
        <CornExpandable className="corn-tree-view">
          <CornExpandableSummary>
            <SummaryIcon icon="chevron-right" />
            Summary 2
          </CornExpandableSummary>
          <CornExpandableContent>More details</CornExpandableContent>
        </CornExpandable>
      </CornExpandableContent>
    </CornExpandable>
  </div>
);
