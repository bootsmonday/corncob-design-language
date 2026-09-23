import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { CornLink, CornLinkList } from './link.jsx';

function RouterLinkStub({ to, children, ...props }) {
  return (
    <a {...props} href={to} data-router="stub">
      {children}
    </a>
  );
}

describe('CornLink', () => {
  test('renders an anchor with corn-link by default', () => {
    render(<CornLink href="#a">Forgot Password?</CornLink>);

    const link = screen.getByRole('link', { name: 'Forgot Password?' });
    expect(link).toHaveClass('corn-link');
    expect(link).toHaveAttribute('href', '#a');
  });

  test('renders underline variant class', () => {
    render(
      <CornLink underline href="#a">
        Underline Link
      </CornLink>
    );

    expect(screen.getByRole('link', { name: 'Underline Link' })).toHaveClass('corn-link--underline');
  });

  test('supports router-style link components via as prop', () => {
    render(
      <CornLink as={RouterLinkStub} to="/settings">
        Settings
      </CornLink>
    );

    const link = screen.getByRole('link', { name: 'Settings' });
    expect(link).toHaveClass('corn-link');
    expect(link).toHaveAttribute('href', '/settings');
    expect(link).toHaveAttribute('data-router', 'stub');
  });

  test('forwards a ref to the host element', () => {
    const ref = createRef();
    render(
      <CornLink ref={ref} href="#a">
        Docs
      </CornLink>
    );

    expect(ref.current).toBe(screen.getByRole('link', { name: 'Docs' }));
  });
});

describe('CornLinkList', () => {
  test('renders a ul with corn-link-list class', () => {
    const { container } = render(
      <CornLinkList>
        <li>
          <CornLink href="#a">One</CornLink>
        </li>
      </CornLinkList>
    );

    expect(container.querySelector('ul')).toHaveClass('corn-link-list');
    expect(screen.getByRole('link', { name: 'One' })).toHaveClass('corn-link');
  });
});
