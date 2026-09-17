import { render, screen } from '@testing-library/react';
import { CornPopover } from './popover.jsx';

describe('CornPopover', () => {
  test('renders the trigger button and links it with aria-controls', () => {
    render(
      <CornPopover id="popover-a" triggerText="Open">
        <div>Content</div>
      </CornPopover>
    );

    const button = screen.getByRole('button', { name: 'Open' });
    expect(button).toHaveAttribute('aria-controls', 'popover-a');
    expect(button).toHaveClass('corn-button', 'corn-pop');
  });

  test('renders corn-popover with default classes and position', () => {
    const { container } = render(
      <CornPopover id="popover-b" triggerText="Open">
        <div>Content</div>
      </CornPopover>
    );

    const popover = container.querySelector('corn-popover');
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveAttribute('id', 'popover-b');
    expect(popover).toHaveAttribute('position', 'top');
    expect(popover).toHaveClass('corn-popover');
  });

  test('supports custom position and class names', () => {
    const { container } = render(
      <CornPopover id="popover-c" position="bottom-right" triggerText="Open" className="custom-popover" anchorClassName="custom-anchor" triggerClassName="custom-trigger">
        <div>Content</div>
      </CornPopover>
    );

    const anchor = container.querySelector('.custom-anchor');
    const button = screen.getByRole('button', { name: 'Open' });
    const popover = container.querySelector('corn-popover');

    expect(anchor).toBeInTheDocument();
    expect(button).toHaveClass('corn-button', 'corn-pop', 'custom-trigger');
    expect(popover).toHaveAttribute('position', 'bottom-right');
    expect(popover).toHaveClass('corn-popover', 'custom-popover');
  });
});
