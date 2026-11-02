import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornLink, CornLinkList } from '../../index.js';

function DemoRouterLink({ to, children, ...props }) {
  return (
    <a {...props} href={to} data-router-link="true">
      {children}
    </a>
  );
}

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <>
    <h1>Link Stickersheet</h1>

    <hr />

    <section id="links">
      <h2>Links</h2>
      <div>
        <CornLink href="#example-link">Forgot Username or Password?</CornLink>
      </div>

      <div>
        <CornLink href="#example-link">Create a new account</CornLink>
      </div>

      <div>
        <CornLink as={DemoRouterLink} to="/account/recover">
          React Router style link
        </CornLink>
      </div>
    </section>

    <hr />

    <section id="inline-links">
      <h2>Inline Links</h2>
      <p>
        The language includes over{' '}
        <CornLink underline href="#example-link">
          40 coded user interface elements
        </CornLink>
        , including buttons, form controls, navigation, modals and more, as well as several{' '}
        <CornLink underline href="#example-link">
          page templates
        </CornLink>
        . We&apos;re continuing to release{' '}
        <CornLink underline as={DemoRouterLink} to="/components/new">
          additional components
        </CornLink>{' '}
        to meet the needs of our diverse product suite.
      </p>
    </section>

    <section id="link-lists">
      <h2>Link Lists</h2>
      <CornLinkList>
        <li>
          <CornLink href="#">Link list item one</CornLink>
        </li>
        <li>
          <CornLink as={DemoRouterLink} to="/docs/two">
            Link list item two
          </CornLink>
        </li>
        <li>
          <CornLink href="#">Link list item three</CornLink>
        </li>
      </CornLinkList>
    </section>
  </>
);
