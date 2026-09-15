import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornButton } from '../../index.js';

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <div class="button-demo">
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
// <div className="corn-form--row">
//   <CcButton size="md">MD Button</CcButton>
//   <CcButton variant="secondary" size="md">
//     MD Secondary
//   </CcButton>
//   <CcButton variant="danger" size="md">
//     MD Danger
//   </CcButton>
// </div>

// <div class="button-demo">
//   <h2>Buttons</h2>

//   <h3>Extra Small (xs)</h3>
//   <div class="corn-form--row">
//     <button class="corn-button corn-button--xs" type="button">
//       XS Button
//     </button>
//     <button class="corn-button corn-button--xs corn-button--secondary" type="button">
//       XS Secondary
//     </button>
//     <button class="corn-button corn-button--xs corn-button--danger" type="button">
//       XS Danger
//     </button>
//     <button class="corn-button corn-button--xs corn-button" type="button" disabled>
//       XS Disabled
//     </button>
//   </div>
//   <hr />
//   <h3>Small (sm)</h3>
//   <div class="corn-form--row">
//     <button class="corn-button corn-button--sm" type="button">
//       SM Button
//     </button>
//     <button class="corn-button corn-button--sm corn-button--secondary" type="button">
//       SM Secondary
//     </button>
//     <button class="corn-button corn-button--sm corn-button--danger" type="button">
//       SM Danger
//     </button>
//     <button class="corn-button corn-button--sm corn-button" type="button" disabled>
//       SM Disabled
//     </button>
//   </div>
//   <hr />
//   <h3>Default Medium (md)</h3>
//   <div class="corn-form--row">
//     <button class="corn-button corn-button--md" type="button">
//       MD Button
//     </button>
//     <button class="corn-button corn-button--md corn-button--secondary" type="button">
//       MD Secondary
//     </button>
//     <button class="corn-button corn-button--md corn-button--danger" type="button">
//       MD Danger
//     </button>
//     <button class="corn-button corn-button--md corn-button" type="button" disabled>
//       MD Disabled
//     </button>
//   </div>
//   <hr />
//   <h3>Large (lg)</h3>
//   <div class="corn-form--row">
//     <button class="corn-button corn-button--lg" type="button">
//       LG Button
//     </button>
//     <button class="corn-button corn-button--lg corn-button--secondary" type="button">
//       LG Secondary
//     </button>
//     <button class="corn-button corn-button--lg corn-button--danger" type="button">
//       LG Danger
//     </button>
//     <button class="corn-button corn-button--lg corn-button" type="button" disabled>
//       LG Disabled
//     </button>
//   </div>
//   <hr />
//   <h3>Extra Large (xl)</h3>
//   <div class="corn-form--row">
//     <button class="corn-button corn-button--xl" type="button">
//       XL Button
//     </button>
//     <button class="corn-button corn-button--xl corn-button--secondary" type="button">
//       XL Secondary
//     </button>
//     <button class="corn-button corn-button--xl corn-button--danger" type="button">
//       XL Danger
//     </button>
//     <button class="corn-button corn-button--xl corn-button" type="button" disabled>
//       XL Disabled
//     </button>
//   </div>

//   <hr />
//   <h3>Icon Only (xs)</h3>
//   <div class="corn-form--row">
//     <button class="corn-button corn-button--icon corn-button--xs" aria-label="Close" type="button">
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//     <button class="corn-button corn-button--icon corn-button--secondary corn-button--xs" aria-label="Close" type="button">
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//     <button class="corn-button corn-button--icon corn-button--danger corn-button--xs" aria-label="Close" type="button">
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//     <button class="corn-button corn-button--icon corn-button--xs" aria-label="Close" type="button" disabled>
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//   </div>
//   <hr />
//   <h3>Icon Only (sm)</h3>
//   <div class="corn-form--row">
//     <button class="corn-button corn-button--icon corn-button--sm" aria-label="Close" type="button">
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//     <button class="corn-button corn-button--icon corn-button--secondary corn-button--sm" aria-label="Close" type="button">
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//     <button class="corn-button corn-button--icon corn-button--danger corn-button--sm" aria-label="Close" type="button">
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//     <button class="corn-button corn-button--icon corn-button--sm" aria-label="Close" type="button" disabled>
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//   </div>
//   <hr />
//   <h3>Icon Only (md)</h3>
//   <div class="corn-form--row">
//     <button class="corn-button corn-button--icon" aria-label="Close" type="button">
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//     <button class="corn-button corn-button--icon corn-button--secondary" aria-label="Close" type="button">
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//     <button class="corn-button corn-button--icon corn-button--danger" aria-label="Close" type="button">
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//     <button class="corn-button corn-button--icon" aria-label="Close" type="button" disabled>
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//   </div>
//   <hr />
//   <h3>Icon Only (lg)</h3>
//   <div class="corn-form--row">
//     <button class="corn-button corn-button--icon corn-button--lg" aria-label="Close" type="button">
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//     <button class="corn-button corn-button--icon corn-button--secondary corn-button--lg" aria-label="Close" type="button">
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//     <button class="corn-button corn-button--icon corn-button--danger corn-button--lg" aria-label="Close" type="button">
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//     <button class="corn-button corn-button--icon corn-button--lg" aria-label="Close" type="button" disabled>
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//   </div>
//   <hr />
//   <h3>Icon Only (xl)</h3>
//   <div class="corn-form--row">
//     <button class="corn-button corn-button--icon corn-button--xl" aria-label="Close" type="button">
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//     <button class="corn-button corn-button--icon corn-button--secondary corn-button--xl" aria-label="Close" type="button">
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//     <button class="corn-button corn-button--icon corn-button--danger corn-button--xl" aria-label="Close" type="button">
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//     <button class="corn-button corn-button--icon corn-button--xl" aria-label="Close" type="button" disabled>
//       <svg xmlns="http://www.w3.org/2000/svg" class="corn-icon">
//         <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
//       </svg>
//     </button>
//   </div>
//   <h3>Button Group</h3>
//   <div class="corn-form--row corn-button-group">
//     <button class="corn-button corn-button--md" type="button">
//       MD Button
//     </button>
//     <button class="corn-button corn-button--md corn-button--secondary" type="button">
//       MD Secondary
//     </button>
//     <button class="corn-button corn-button--md corn-button--danger" type="button">
//       MD Danger
//     </button>
//   </div>

//   <hr />

//   <h3>Copy Button</h3>
//   <div>
//     <div id="copy-button-1">Text to Copy</div>
//     <corn-copy-button class="corn-copy-button" copyselector="#copy-button-1" copysuccess="Text copied to clipboard" copyfailure="Failed to copy">
//       <button class="corn-button corn-button--xs" aria-controls="copy-button-1" aria-label="Copy text to clipboard" type="button">
//         copy
//       </button>
//       <div role="status" aria-live="polite" class="corn-assistive-text"></div>
//     </corn-copy-button>
//   </div>
// </div>
