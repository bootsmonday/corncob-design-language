import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { CornPanel } from './panel.jsx';

describe('CornPanel', () => {
  test('renders a div with corn-panel class by default', () => {
    const { container } = render(
      <CornPanel>
        <h2>Corn Panel</h2>
      </CornPanel>
    );

    const panel = container.querySelector('.corn-panel');
    expect(panel.tagName).toBe('DIV');
    expect(panel).toContainElement(screen.getByRole('heading', { name: 'Corn Panel' }));
  });

  test('supports nested panels', () => {
    const { container } = render(
      <CornPanel>
        <h2>Corn Panel</h2>
        <CornPanel>
          <h3>Nested Corn Panel</h3>
        </CornPanel>
      </CornPanel>
    );

    expect(container.querySelectorAll('.corn-panel')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'Nested Corn Panel' })).toBeTruthy();
  });

  test('supports custom element type via as prop', () => {
    const { container } = render(
      <CornPanel as="section" aria-label="Panel Section">
        <h2>Corn Panel</h2>
      </CornPanel>
    );

    const panel = container.querySelector('.corn-panel');
    expect(panel.tagName).toBe('SECTION');
    expect(panel).toHaveAttribute('aria-label', 'Panel Section');
  });

  test('forwards ref to host element', () => {
    const ref = createRef();
    render(
      <CornPanel ref={ref}>
        <h2>Corn Panel</h2>
      </CornPanel>
    );

    expect(ref.current).toBe(screen.getByRole('heading', { name: 'Corn Panel' }).closest('.corn-panel'));
  });
});
