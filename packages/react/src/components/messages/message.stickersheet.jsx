import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornMessage, CornMessageContent, CornMessageStatus, CornMessageTitle } from '../../index.js';

function MessageStatusIcon({ icon }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon" aria-hidden="true">
      <use href={`/node_modules/bootstrap-icons/bootstrap-icons.svg#${icon}`}></use>
    </svg>
  );
}

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <>
    <h2>CornMessage API Coverage</h2>

    <h3>variant</h3>
    <CornMessage variant="success">
      <CornMessageStatus>
        <MessageStatusIcon icon="check-lg" />
      </CornMessageStatus>
      <CornMessageContent>
        <CornMessageTitle>Success Message</CornMessageTitle>
        <p>This is a success message.</p>
      </CornMessageContent>
    </CornMessage>
    <CornMessage variant="warning">
      <CornMessageStatus>
        <MessageStatusIcon icon="exclamation-triangle" />
      </CornMessageStatus>
      <CornMessageContent>
        <CornMessageTitle>Warning Message</CornMessageTitle>
        <p>This is a warning message.</p>
      </CornMessageContent>
    </CornMessage>
    <CornMessage variant="error">
      <CornMessageStatus>
        <MessageStatusIcon icon="x-lg" />
      </CornMessageStatus>
      <CornMessageContent>
        <CornMessageTitle>Error Message</CornMessageTitle>
        <p>This is an error message.</p>
      </CornMessageContent>
    </CornMessage>
    <CornMessage variant="info">
      <CornMessageStatus>
        <MessageStatusIcon icon="info-lg" />
      </CornMessageStatus>
      <CornMessageContent>
        <CornMessageTitle>Info Message</CornMessageTitle>
        <p>This is an info message.</p>
      </CornMessageContent>
    </CornMessage>

    <h3>default variant (info)</h3>
    <CornMessage>
      <CornMessageStatus>
        <MessageStatusIcon icon="info-lg" />
      </CornMessageStatus>
      <CornMessageContent>
        <CornMessageTitle>Default Variant Message</CornMessageTitle>
        <p>When variant is omitted, CornMessage defaults to info.</p>
      </CornMessageContent>
    </CornMessage>

    <h3>children</h3>
    <CornMessage variant="success">
      <CornMessageContent>
        <CornMessageTitle>Status omitted</CornMessageTitle>
        <p>No status block is rendered unless you include CornMessageStatus.</p>
      </CornMessageContent>
    </CornMessage>

    <h3>CornMessageTitle as</h3>
    <CornMessage variant="warning">
      <CornMessageStatus>
        <MessageStatusIcon icon="exclamation-triangle" />
      </CornMessageStatus>
      <CornMessageContent>
        <CornMessageTitle as="p">Title rendered as paragraph</CornMessageTitle>
      </CornMessageContent>
    </CornMessage>

    <h3>className + prop passthrough</h3>
    <CornMessage variant="info" className="api-coverage-custom-message" id="api-coverage-message" data-testid="api-coverage-message">
      <CornMessageStatus>
        <MessageStatusIcon icon="info-lg" />
      </CornMessageStatus>
      <CornMessageContent>
        <CornMessageTitle>Custom class and attributes</CornMessageTitle>
        <p>Supports className merging and standard div attributes.</p>
      </CornMessageContent>
    </CornMessage>
  </>
);
