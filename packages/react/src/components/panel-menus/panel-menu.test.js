import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { CornPanelMenu, CornPanelMenuExpandable, CornPanelMenuItem, CornPanelMenuSubmenu } from './panel-menu.jsx';

describe('CornPanelMenu', () => {
  test('renders menu container and items', () => {
    const { container } = render(
      <CornPanelMenu>
        <CornPanelMenuItem href="#">Menu Item 1</CornPanelMenuItem>
        <CornPanelMenuItem href="#" active>
          Menu Item 2
        </CornPanelMenuItem>
      </CornPanelMenu>
    );

    expect(container.querySelector('.corn-panel-menu')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Menu Item 1' })).toHaveClass('corn-panel-menu--item');
    expect(screen.getByRole('link', { name: 'Menu Item 2' })).toHaveClass('corn-panel-menu--item', 'corn-panel-menu--item--active');
  });

  test('renders expandable section using corn-expandable web component', () => {
    const { container } = render(
      <CornPanelMenuExpandable summary="Menu Category">
        <CornPanelMenuSubmenu>
          <CornPanelMenuItem href="#">Sub Menu Item 1</CornPanelMenuItem>
        </CornPanelMenuSubmenu>
      </CornPanelMenuExpandable>
    );

    expect(container.querySelector('corn-expandable')).toBeTruthy();
    expect(container.querySelector('details')).toHaveAttribute('slot', 'details');
    expect(container.querySelector('summary')).toHaveClass('corn-panel-menu--item', 'corn-expandable-button');
    expect(container.querySelector('summary .corn-icon')).toBeNull();
    expect(screen.getByText('Sub Menu Item 1')).toBeTruthy();
  });

  test('renders custom icon when provided', () => {
    const { container } = render(
      <CornPanelMenuExpandable
        summary="Menu Category"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon" aria-hidden="true">
            <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#chevron-right"></use>
          </svg>
        }
      >
        content
      </CornPanelMenuExpandable>
    );

    expect(container.querySelector('summary .corn-icon')).toBeTruthy();
  });

  test('forwards refs to host elements', () => {
    const menuRef = createRef();
    const itemRef = createRef();
    const expandableRef = createRef();

    render(
      <>
        <CornPanelMenu ref={menuRef} />
        <CornPanelMenuItem ref={itemRef} href="#">
          Link
        </CornPanelMenuItem>
        <CornPanelMenuExpandable ref={expandableRef} summary="Summary">
          content
        </CornPanelMenuExpandable>
      </>
    );

    expect(menuRef.current.classList.contains('corn-panel-menu')).toBe(true);
    expect(itemRef.current.classList.contains('corn-panel-menu--item')).toBe(true);
    expect(expandableRef.current.tagName).toBe('CORN-EXPANDABLE');
  });
});
