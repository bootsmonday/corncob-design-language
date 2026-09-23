import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornMessage } from '../../index.js';

const PAGE_LEVEL_MESSAGES = [
  {
    variant: 'success',
    icon: 'check-lg',
    title: 'Success Message',
    body: 'This is a success message. It indicates that an action was completed successfully.',
  },
  {
    variant: 'warning',
    icon: 'exclamation-triangle',
    title: 'Warning Message',
    body: 'This is a warning message. It indicates that there is a potential issue that needs attention.',
  },
  {
    variant: 'error',
    icon: 'x-lg',
    title: 'Error Message',
    body: 'This is an error message. It indicates that an action failed or there is a critical issue.',
  },
  {
    variant: 'info',
    icon: 'info-lg',
    title: 'Info Message',
    body: 'This is an info message. It provides additional information or context about a situation.',
  },
];

const HEADER_ONLY_MESSAGES = [
  { variant: 'success', icon: 'check-lg', title: 'This is a success message.' },
  { variant: 'warning', icon: 'exclamation-triangle', title: 'This is a warning message.' },
  { variant: 'error', icon: 'x-lg', title: 'This is an error message.' },
  { variant: 'info', icon: 'info-lg', title: 'This is an info message.' },
];

function MessageStatusIcon({ icon }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon" aria-hidden="true">
      <use href={`/node_modules/bootstrap-icons/bootstrap-icons.svg#${icon}`}></use>
    </svg>
  );
}

function MessageSection({ items, headerOnly = false }) {
  return items.map(({ variant, icon, title, body }) => (
    <React.Fragment key={`${headerOnly ? 'header-only' : 'page-level'}-${variant}`}>
      <CornMessage variant={variant} title={title} titleAs={headerOnly ? 'p' : 'h3'} status={<MessageStatusIcon icon={icon} />}>
        {headerOnly ? null : <p>{body}</p>}
      </CornMessage>
      {variant !== 'info' ? <hr /> : null}
    </React.Fragment>
  ));
}

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <>
    <h2>Page-Level Messages</h2>
    <MessageSection items={PAGE_LEVEL_MESSAGES} />

    <h2>Header-Only Messages</h2>
    <MessageSection items={HEADER_ONLY_MESSAGES} headerOnly />
  </>
);
