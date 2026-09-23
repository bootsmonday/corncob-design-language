import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { CornBadge } from './badge.jsx';

describe('CornBadge', () => {
  test('renders stickersheet-style status and content blocks', () => {
    const { container } = render(<CornBadge>neutral</CornBadge>);

    const badge = container.querySelector('.corn-badge');
    const status = container.querySelector('.corn-badge--status');
    const content = container.querySelector('.corn-badge--content');

    expect(badge).toBeTruthy();
    expect(status).toBeTruthy();
    expect(content).toBeTruthy();
    expect(content).toHaveTextContent('neutral');
  });

  test('maps variant and size props to classes', () => {
    render(
      <CornBadge variant="success" size="sm">
        success
      </CornBadge>
    );

    expect(screen.getByText('success').closest('.corn-badge')).toHaveClass('corn-badge', 'corn-badge--success', 'corn-badge--sm');
  });

  test('does not add modifier classes for neutral md defaults', () => {
    const { container } = render(<CornBadge>neutral</CornBadge>);

    const badge = container.querySelector('.corn-badge');
    expect(badge.className).toBe('corn-badge');
  });

  test('renders custom status content', () => {
    const { container } = render(
      <CornBadge
        status={
          <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon" aria-hidden="true">
            <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#check-lg"></use>
          </svg>
        }
      >
        success
      </CornBadge>
    );

    expect(container.querySelector('.corn-badge--status svg')).toBeTruthy();
    expect(container.querySelector('.corn-badge--content')).toHaveTextContent('success');
  });

  test('forwards arbitrary props and extra className', () => {
    render(
      <CornBadge className="toolbar-action" data-testid="badge">
        info
      </CornBadge>
    );

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('corn-badge', 'toolbar-action');
  });

  test('forwards a ref to the host element', () => {
    const ref = createRef();
    render(<CornBadge ref={ref}>Save</CornBadge>);

    expect(ref.current).toBe(screen.getByText('Save').closest('.corn-badge'));
  });

  test('supports a callback ref', () => {
    const ref = jest.fn();
    render(<CornBadge ref={ref}>Save</CornBadge>);

    expect(ref).toHaveBeenCalledWith(screen.getByText('Save').closest('.corn-badge'));
  });
});
