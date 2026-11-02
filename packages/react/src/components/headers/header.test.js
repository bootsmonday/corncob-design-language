import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { CornHeader, CornHeaderActions, CornHeaderCompany, CornHeaderCompanyLogo, CornHeaderCompanyName, CornHeaderNav, CornHeaderTitle } from './header.jsx';

describe('CornHeader', () => {
  test('renders canonical header structure classes', () => {
    const { container } = render(
      <CornHeader>
        <CornHeaderCompany>
          <CornHeaderCompanyLogo>
            <svg aria-hidden="true"></svg>
          </CornHeaderCompanyLogo>
          <CornHeaderCompanyName>Corncob</CornHeaderCompanyName>
        </CornHeaderCompany>
        <CornHeaderTitle>Title Page</CornHeaderTitle>
        <CornHeaderNav>
          <a href="#" className="corn-button corn-button--sm">
            Link 1
          </a>
        </CornHeaderNav>
        <CornHeaderActions>
          <button className="corn-button corn-button--xs" type="button">
            Action 1
          </button>
        </CornHeaderActions>
      </CornHeader>
    );

    expect(container.querySelector('header.corn-header')).toBeTruthy();
    expect(container.querySelector('.corn-company')).toBeTruthy();
    expect(container.querySelector('.corn-company--logo svg')).toBeTruthy();
    expect(container.querySelector('.corn-company--name')).toHaveTextContent('Corncob');
    expect(container.querySelector('.corn-header--title')).toHaveTextContent('Title Page');
    expect(container.querySelector('nav.corn-header--nav')).toBeTruthy();
    expect(container.querySelector('.corn-header--actions')).toBeTruthy();
  });

  test('supports custom heading element for header title', () => {
    render(
      <CornHeader>
        <CornHeaderTitle as="h1" data-testid="title">
          Title Page
        </CornHeaderTitle>
      </CornHeader>
    );

    const title = screen.getByTestId('title');
    expect(title.tagName).toBe('H1');
    expect(title).toHaveClass('corn-header--title');
  });

  test('forwards ref to header root element', () => {
    const ref = createRef();

    render(
      <CornHeader ref={ref}>
        <CornHeaderTitle>Title Page</CornHeaderTitle>
      </CornHeader>
    );

    expect(ref.current).toBe(screen.getByText('Title Page').closest('.corn-header'));
  });
});
