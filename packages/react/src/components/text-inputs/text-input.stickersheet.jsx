import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornTextInput } from '../../index.js';

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <div class="text-input-demo">
    <h2>Text Inputs</h2>

    <h3>Extra Small (xs)</h3>
    <div class="corn-form--row">
      <CornTextInput size="xs" label="What is your name?" id="input--xs" placeholder="Enter Full Name..." />
    </div>
    <hr />
    <h3>Small (sm)</h3>
    <div class="corn-form--row">
      <CornTextInput size="sm" label="What is your name?" id="input--sm" placeholder="Enter Full Name..." />
    </div>
    <hr />
    <h3>Default Medium (md)</h3>
    <div class="corn-form--row">
      <CornTextInput size="md" label="What is your name?" id="input--md" placeholder="Enter Full Name..." />
    </div>
    <hr />
    <h3>Large (lg)</h3>
    <div class="corn-form--row">
      <CornTextInput size="lg" label="What is your name?" id="input--lg" placeholder="Enter Full Name..." />
    </div>
    <hr />
    <h3>Extra Large (xl)</h3>
    <div class="corn-form--row">
      <CornTextInput size="xl" label="What is your name?" id="input--xl" placeholder="Enter Full Name..." />
    </div>

    <h3>Single Row</h3>
    <div class="corn-form--row">
      <CornTextInput size="md" label="First Name" id="input--md-1" placeholder="Enter First Name..." />
      <CornTextInput size="md" label="Last Name" id="input--md-2" placeholder="Enter Last Name..." />
    </div>
  </div>
);
