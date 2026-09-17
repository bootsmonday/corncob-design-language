import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornPopover } from '../../index.js';

function ListContent() {
  return (
    <ul>
      <li>
        <a href="#">Item 1</a>
      </li>
      <li>
        <a href="#">Item 2</a>
      </li>
      <li>
        <a href="#">Item 3</a>
      </li>
    </ul>
  );
}

function TopRadioContent() {
  return (
    <fieldset className="corn-form--item corn-radio-button-group">
      <legend>Group Label</legend>
      <div className="corn-radio-button">
        <input type="radio" id="example1-top" name="example" defaultChecked />
        <label htmlFor="example1-top">Radio Button One</label>
      </div>
      <div className="corn-radio-button">
        <input type="radio" id="example2-top" name="example" />
        <label htmlFor="example2-top">Radio Button Two</label>
      </div>
    </fieldset>
  );
}

function BottomRadioContent() {
  return (
    <fieldset className="corn-form--item corn-radio-button-group">
      <legend>Group Label</legend>
      <div className="corn-radio-button">
        <input type="radio" id="example1-bottom" name="example" defaultChecked />
        <label htmlFor="example1-bottom">Radio Button One</label>
      </div>
      <div className="corn-radio-button">
        <input type="radio" id="example2-bottom" name="example" />
        <label htmlFor="example2-bottom">Radio Button Two</label>
      </div>
    </fieldset>
  );
}

function BottomRightCheckboxContent() {
  return (
    <fieldset className="corn-form--item corn-checkbox-group">
      <legend>Group Label</legend>
      <div className="corn-checkbox">
        <input type="checkbox" id="example4" name="example" />
        <label htmlFor="example4">Checkbox One</label>
      </div>
      <div className="corn-checkbox">
        <input type="checkbox" id="example5" name="example" defaultChecked />
        <label htmlFor="example5">Checkbox Two</label>
      </div>
      <div className="corn-checkbox">
        <input type="checkbox" id="example6" name="example" />
        <label htmlFor="example6">Checkbox Three</label>
      </div>
    </fieldset>
  );
}

function FormContent() {
  return (
    <div>
      <form className="corn-form" id="hex-seed-form">
        <div className="corn-form--item" id="hex-seed-item">
          <div className="corn-text-input corn-text-input--xs">
            <input id="hex-seed-input" name="input" placeholder="Hex value" />
            <label htmlFor="hex-seed-input" className="corn-assistive-text">
              Enter a hex seed value
            </label>
          </div>
          <div className="corn-status"></div>
        </div>
        <div className="corn-button-group">
          <button className="corn-button corn-button--xs" type="button">
            Validate
          </button>
        </div>
      </form>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <div className="popover-demo">
    <h2>Corn Popover</h2>

    <h3>Default (Top)</h3>
    <CornPopover id="popover-top" position="top" triggerText="Default (Top)">
      <TopRadioContent />
    </CornPopover>

    <h3>Top-Right</h3>
    <CornPopover id="popover-top-right" position="top-right" triggerText="Top-Right">
      <ListContent />
    </CornPopover>

    <h3>Top-Left</h3>
    <CornPopover id="popover-top-left" position="top-left" triggerText="Top-Left">
      <ListContent />
    </CornPopover>

    <h3>Right Position</h3>
    <CornPopover id="popover-right" position="right" triggerText="Right">
      <ListContent />
    </CornPopover>

    <h3>Right-Top Position</h3>
    <CornPopover id="popover-right-top" position="right-top" triggerText="Right-Top">
      <ListContent />
    </CornPopover>

    <h3>Right-Bottom Position</h3>
    <CornPopover id="popover-right-bottom" position="right-bottom" triggerText="Right-Bottom">
      <ListContent />
    </CornPopover>

    <h3>Bottom Position</h3>
    <CornPopover id="popover-bottom" position="bottom" triggerText="Bottom">
      <BottomRadioContent />
    </CornPopover>

    <h3>Bottom-Right Position</h3>
    <CornPopover id="popover-bottom-right" position="bottom-right" triggerText="Bottom-Right">
      <BottomRightCheckboxContent />
    </CornPopover>

    <h3>Bottom-Left Position</h3>
    <CornPopover id="popover-bottom-left" position="bottom-left" triggerText="Bottom-Left">
      <ListContent />
    </CornPopover>

    <h3>Left Position</h3>
    <CornPopover id="popover-left" position="left" triggerText="Left">
      <ListContent />
    </CornPopover>

    <h3>Left-Top Position</h3>
    <CornPopover id="popover-left-top" position="left-top" triggerText="Left-Top">
      <ListContent />
    </CornPopover>

    <h3>Left-Bottom Position</h3>
    <CornPopover id="popover-left-bottom" position="left-bottom" triggerText="Left-Bottom">
      <ListContent />
    </CornPopover>

    <h3>Popover With Form</h3>
    <CornPopover id="popover-form-right" position="right" triggerText="Form">
      <FormContent />
    </CornPopover>

    <h3>Nested Bottom Position</h3>
    <CornPopover id="nest-popover-bottom" position="bottom" triggerText="Nested Bottom">
      <ul>
        <li>
          <a href="#">Item 1</a>
        </li>
        <li>
          <a href="#">Item 2</a>
        </li>
        <li>
          <CornPopover id="nest-popover-right" position="right" triggerText="nested right" triggerClassName="corn-button--xs">
            <ListContent />
          </CornPopover>
        </li>
      </ul>
    </CornPopover>
  </div>
);
