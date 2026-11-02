import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornExpandable, CornExpandableContent, CornExpandableSummary, CornPanelMenu, CornPanelMenuItem, CornPanelMenuSubmenu } from '../../index.js';

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <div className="panel-menu-demo">
    <h2>Corn Panel Menu</h2>

    <CornPanelMenu>
      <CornPanelMenuItem href="#">Menu Item 1</CornPanelMenuItem>
      <CornPanelMenuItem href="#">Menu Item 2</CornPanelMenuItem>

      <CornExpandable className="corn-expandable">
        <CornExpandableSummary className="corn-panel-menu--item corn-expandable-button">
          Menu Category
          <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon" aria-hidden="true">
            <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#chevron-right"></use>
          </svg>
        </CornExpandableSummary>
        <CornExpandableContent>
          <CornPanelMenuSubmenu>
            <CornPanelMenuItem href="#">Sub Menu Item 1</CornPanelMenuItem>
            <CornPanelMenuItem href="#">Sub Menu Item 2</CornPanelMenuItem>
          </CornPanelMenuSubmenu>
        </CornExpandableContent>
      </CornExpandable>

      <CornPanelMenuItem href="#" active>
        Menu Item 3
      </CornPanelMenuItem>
    </CornPanelMenu>
  </div>
);
