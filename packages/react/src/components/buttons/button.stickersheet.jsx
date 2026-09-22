import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornButton } from '../../index.js';

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <div className="button-demo">
    <h2>Buttons</h2>
    <div className="corn-form--row">
      <CornButton size="md">MD Button</CornButton>
      <CornButton variant="secondary" size="md">
        MD Secondary
      </CornButton>
      <CornButton variant="danger" size="md">
        MD Danger
      </CornButton>
      <CornButton variant="primary" size="md" disabled>
        MD Disabled
      </CornButton>
    </div>
    <h3>Extra Small (xs)</h3>
    <div className="corn-form--row">
      <CornButton size="xs">XS Button</CornButton>
      <CornButton variant="secondary" size="xs">
        XS Secondary
      </CornButton>
      <CornButton variant="danger" size="xs">
        XS Danger
      </CornButton>
      <CornButton variant="primary" size="xs" disabled>
        XS Disabled
      </CornButton>
    </div>
    <h3>Small (sm)</h3>
    <div className="corn-form--row">
      <CornButton size="sm">SM Button</CornButton>
      <CornButton variant="secondary" size="sm">
        SM Secondary
      </CornButton>
      <CornButton variant="danger" size="sm">
        SM Danger
      </CornButton>
      <CornButton variant="primary" size="sm" disabled>
        SM Disabled
      </CornButton>
    </div>
    <h3>Large (lg)</h3>
    <div className="corn-form--row">
      <CornButton size="lg">LG Button</CornButton>
      <CornButton variant="secondary" size="lg">
        LG Secondary
      </CornButton>
      <CornButton variant="danger" size="lg">
        LG Danger
      </CornButton>
      <CornButton variant="primary" size="lg" disabled>
        LG Disabled
      </CornButton>
    </div>
    <h3>Extra Large (xl)</h3>
    <div className="corn-form--row">
      <CornButton size="xl">XL Button</CornButton>
      <CornButton variant="secondary" size="xl">
        XL Secondary
      </CornButton>
      <CornButton variant="danger" size="xl">
        XL Danger
      </CornButton>
      <CornButton variant="primary" size="xl" disabled>
        XL Disabled
      </CornButton>
    </div>
    <h3>Icon Only (md)</h3>
    <div className="corn-form--row">
      <CornButton size="md" icon>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
      <CornButton variant="secondary" size="md" icon>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
      <CornButton variant="danger" size="md" icon>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
      <CornButton variant="primary" size="md" icon>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
      <CornButton variant="primary" size="md" icon disabled>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
    </div>
    <h3>Icon Only (xs)</h3>
    <div className="corn-form--row">
      <CornButton size="xs" icon>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
      <CornButton variant="secondary" size="xs" icon>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
      <CornButton variant="danger" size="xs" icon>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
      <CornButton variant="primary" size="xs" icon disabled>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
    </div>
    <h3>Icon Only (sm)</h3>
    <div className="corn-form--row">
      <CornButton size="sm" icon>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
      <CornButton variant="secondary" size="sm" icon>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
      <CornButton variant="danger" size="sm" icon>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
      <CornButton variant="primary" size="sm" icon disabled>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
    </div>
    <h3>Icon Only (lg)</h3>
    <div className="corn-form--row">
      <CornButton size="lg" icon>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
      <CornButton variant="secondary" size="lg" icon>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
      <CornButton variant="danger" size="lg" icon>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
      <CornButton variant="primary" size="lg" icon disabled>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
    </div>
    <h3>Icon Only (xl)</h3>
    <div className="corn-form--row">
      <CornButton size="xl" icon>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
      <CornButton variant="secondary" size="xl" icon>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
      <CornButton variant="danger" size="xl" icon>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
      <CornButton variant="primary" size="xl" icon disabled>
        <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon">
          <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
        </svg>
      </CornButton>
    </div>
    <h3>Button Group</h3>
    <div className="corn-form--row corn-button-group">
      <CornButton size="md">MD Button</CornButton>
      <CornButton variant="secondary" size="md">
        MD Secondary
      </CornButton>
      <CornButton variant="danger" size="md">
        MD Danger
      </CornButton>
    </div>
  </div>
);
