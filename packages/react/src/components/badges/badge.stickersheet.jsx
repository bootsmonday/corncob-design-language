import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornBadge } from '../../index.js';

const BADGE_ITEMS = [
  { variant: 'neutral', label: 'neutral', icon: 'dash-lg' },
  { variant: 'success', label: 'success', icon: 'check-lg' },
  { variant: 'warning', label: 'warning', icon: 'exclamation-lg' },
  { variant: 'error', label: 'error', icon: 'x' },
  { variant: 'info', label: 'info', icon: 'info-lg' },
];

function BadgeStatusIcon({ icon }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon" aria-hidden="true">
      <use href={`/node_modules/bootstrap-icons/bootstrap-icons.svg#${icon}`}></use>
    </svg>
  );
}

function BadgeRow({ size = 'md' }) {
  return BADGE_ITEMS.map(({ variant, label, icon }) => (
    <CornBadge key={`${size}-${variant}`} variant={variant} size={size} status={<BadgeStatusIcon icon={icon} />}>
      {label}
    </CornBadge>
  ));
}

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <div className="badges-stickersheet">
    <h2>Badges</h2>
    <BadgeRow />

    <h2>Small Badges</h2>
    <BadgeRow size="sm" />
  </div>
);
