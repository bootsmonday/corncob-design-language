import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornPopover, CornPopoverContent, CornPopoverTrigger } from '../../index.js';

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

    <h3>Simple</h3>
    <CornPopover id="popover-simple" position="bottom" anchorClassName="popover-demo--simple">
      <CornPopoverTrigger className="corn-button--sm">Open simple popover</CornPopoverTrigger>
      <CornPopoverContent className="popover-demo--content">
        <p>Simple content that matches the current popover component pattern.</p>
      </CornPopoverContent>
    </CornPopover>

    <h3>Default (Top)</h3>
    <CornPopover id="popover-top" position="top">
      <CornPopoverTrigger>Default (Top)</CornPopoverTrigger>
      <CornPopoverContent>
        <TopRadioContent />
      </CornPopoverContent>
    </CornPopover>

    <h3>Top-Right</h3>
    <CornPopover id="popover-top-right" position="top-right">
      <CornPopoverTrigger>Top-Right</CornPopoverTrigger>
      <CornPopoverContent>
        <ListContent />
      </CornPopoverContent>
    </CornPopover>

    <h3>Top-Left</h3>
    <CornPopover id="popover-top-left" position="top-left">
      <CornPopoverTrigger>Top-Left</CornPopoverTrigger>
      <CornPopoverContent>
        <ListContent />
      </CornPopoverContent>
    </CornPopover>

    <h3>Right Position</h3>
    <CornPopover id="popover-right" position="right">
      <CornPopoverTrigger>Right</CornPopoverTrigger>
      <CornPopoverContent>
        <ListContent />
      </CornPopoverContent>
    </CornPopover>

    <h3>Right-Top Position</h3>
    <CornPopover id="popover-right-top" position="right-top">
      <CornPopoverTrigger>Right-Top</CornPopoverTrigger>
      <CornPopoverContent>
        <ListContent />
      </CornPopoverContent>
    </CornPopover>

    <h3>Right-Bottom Position</h3>
    <CornPopover id="popover-right-bottom" position="right-bottom">
      <CornPopoverTrigger>Right-Bottom</CornPopoverTrigger>
      <CornPopoverContent>
        <ListContent />
      </CornPopoverContent>
    </CornPopover>

    <h3>Bottom Position</h3>
    <CornPopover id="popover-bottom" position="bottom">
      <CornPopoverTrigger>Bottom</CornPopoverTrigger>
      <CornPopoverContent>
        <BottomRadioContent />
      </CornPopoverContent>
    </CornPopover>

    <h3>Bottom-Right Position</h3>
    <CornPopover id="popover-bottom-right" position="bottom-right">
      <CornPopoverTrigger>Bottom-Right</CornPopoverTrigger>
      <CornPopoverContent>
        <BottomRightCheckboxContent />
      </CornPopoverContent>
    </CornPopover>

    <h3>Bottom-Left Position</h3>
    <CornPopover id="popover-bottom-left" position="bottom-left">
      <CornPopoverTrigger>Bottom-Left</CornPopoverTrigger>
      <CornPopoverContent>
        <ListContent />
      </CornPopoverContent>
    </CornPopover>

    <h3>Left Position</h3>
    <CornPopover id="popover-left" position="left">
      <CornPopoverTrigger>Left</CornPopoverTrigger>
      <CornPopoverContent>
        <ListContent />
      </CornPopoverContent>
    </CornPopover>

    <h3>Left-Top Position</h3>
    <CornPopover id="popover-left-top" position="left-top">
      <CornPopoverTrigger>Left-Top</CornPopoverTrigger>
      <CornPopoverContent>
        <ListContent />
      </CornPopoverContent>
    </CornPopover>

    <h3>Left-Bottom Position</h3>
    <CornPopover id="popover-left-bottom" position="left-bottom">
      <CornPopoverTrigger>Left-Bottom</CornPopoverTrigger>
      <CornPopoverContent>
        <ListContent />
      </CornPopoverContent>
    </CornPopover>

    <h3>Popover With Form</h3>
    <CornPopover id="popover-form-right" position="right">
      <CornPopoverTrigger>Form</CornPopoverTrigger>
      <CornPopoverContent>
        <FormContent />
      </CornPopoverContent>
    </CornPopover>

    <h3>Nested Bottom Position</h3>
    <CornPopover id="nest-popover-bottom" position="bottom">
      <CornPopoverTrigger>Nested Bottom</CornPopoverTrigger>
      <CornPopoverContent>
        <ul>
          <li>
            <a href="#">Item 1</a>
          </li>
          <li>
            <a href="#">Item 2</a>
          </li>
          <li>
            <CornPopover id="nest-popover-right" position="right">
              <CornPopoverTrigger className="corn-button--xs">nested right</CornPopoverTrigger>
              <CornPopoverContent>
                <ListContent />
              </CornPopoverContent>
            </CornPopover>
          </li>
        </ul>
      </CornPopoverContent>
    </CornPopover>
  </div>
);
