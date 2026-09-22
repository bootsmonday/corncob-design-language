import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornButton, CornButtonBar, CornHeader, CornHeaderActions, CornHeaderCompany, CornHeaderCompanyLogo, CornHeaderCompanyName, CornHeaderNav, CornHeaderTitle, CornPopover } from '../../index.js';

const HEADER_LINKS = ['Link 1', 'Link 2', 'Link 3', 'Link 4', 'Link 5', 'Link 6', 'Link 7', 'Link 8', 'Link 9'];

function HeaderSettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon" aria-hidden="true">
      <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#gear"></use>
    </svg>
  );
}

function HeaderGithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon" aria-hidden="true">
      <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#github"></use>
    </svg>
  );
}

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <div className="header-demo">
    <CornHeader>
      <CornHeaderCompany>
        <CornHeaderCompanyLogo>
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <use href="/corn-cob-dl.svg"></use>
          </svg>
        </CornHeaderCompanyLogo>
        <CornHeaderCompanyName>Corncob</CornHeaderCompanyName>
      </CornHeaderCompany>

      <CornHeaderTitle>Title Page</CornHeaderTitle>

      <CornHeaderNav>
        <CornButtonBar>
          {HEADER_LINKS.map((label) => (
            <CornButton key={label} as="a" href="#" size="sm">
              {label}
            </CornButton>
          ))}

          <CornPopover id="button-bar-popover" position="bottom" triggerText="More" triggerClassName="corn-button--sm" anchorClassName="corn-button-bar--more"></CornPopover>
        </CornButtonBar>
      </CornHeaderNav>

      <CornHeaderActions>
        <CornButton size="xs" type="button">
          Action 1
        </CornButton>

        <CornButton size="xs" icon type="button" aria-label="Settings">
          <HeaderSettingsIcon />
        </CornButton>

        <CornButton as="a" href="#" size="xs" icon aria-label="GitHub">
          <HeaderGithubIcon />
        </CornButton>
      </CornHeaderActions>
    </CornHeader>
  </div>
);
