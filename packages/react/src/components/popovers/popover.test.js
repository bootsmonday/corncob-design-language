import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { CornPopover, CornPopoverContent, CornPopoverTrigger } from './popover.jsx';

describe('CornPopover', () => {
  test('renders the trigger and content with matching ids when an id is provided', () => {
    render(
      <CornPopover id="popover-a" position="top">
        <CornPopoverTrigger>Open</CornPopoverTrigger>
        <CornPopoverContent><div>Content</div></CornPopoverContent>
      </CornPopover>
    );

    const button = screen.getByRole('button', { name: 'Open' });
    expect(button).toHaveAttribute('id', 'popover-a-trigger');
    expect(button).toHaveAttribute('aria-controls', 'popover-a-content');
    expect(button).toHaveClass('corn-button', 'corn-pop');

    const popover = document.getElementById('popover-a-content');
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveAttribute('aria-labelledby', 'popover-a-trigger');
    expect(popover).toHaveAttribute('position', 'top');
    expect(popover).toHaveClass('corn-popover');
  });

  test('renders trigger using CornButton styling', () => {
    render(
      <CornPopover id="popover-button">
        <CornPopoverTrigger>Open</CornPopoverTrigger>
        <CornPopoverContent><div>Content</div></CornPopoverContent>
      </CornPopover>
    );

    const button = screen.getByRole('button', { name: 'Open' });
    expect(button).toHaveClass('corn-button');
  });

  test('supports custom trigger classes and nested content', () => {
    render(
      <CornPopover id="popover-react-child">
        <CornPopoverTrigger className="custom-trigger">Open</CornPopoverTrigger>
        <CornPopoverContent><div>Content</div></CornPopoverContent>
      </CornPopover>
    );

    const button = screen.getByRole('button', { name: 'Open' });
    expect(button).toHaveClass('corn-button', 'corn-pop', 'custom-trigger');
    expect(button).toHaveAttribute('aria-controls', 'popover-react-child-content');
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('supports custom position and content class names', () => {
    const { container } = render(
      <CornPopover id="popover-c" position="bottom-right" anchorClassName="custom-anchor">
        <CornPopoverTrigger className="custom-trigger">Open</CornPopoverTrigger>
        <CornPopoverContent className="custom-popover"><div>Content</div></CornPopoverContent>
      </CornPopover>
    );

    const anchor = container.querySelector('.custom-anchor');
    const button = screen.getByRole('button', { name: 'Open' });
    const popover = document.getElementById('popover-c-content');

    expect(anchor).toBeInTheDocument();
    expect(button).toHaveClass('corn-button', 'corn-pop', 'custom-trigger');
    expect(popover).toHaveAttribute('position', 'bottom-right');
    expect(popover).toHaveClass('corn-popover', 'custom-popover');
  });

  test('generates matching ids when one is not provided', () => {
    render(
      <CornPopover>
        <CornPopoverTrigger>Open</CornPopoverTrigger>
        <CornPopoverContent><div>Content</div></CornPopoverContent>
      </CornPopover>
    );

    const button = screen.getByRole('button', { name: 'Open' });
    expect(button).toHaveAttribute('id', expect.stringMatching(/-trigger$/));
    expect(button).toHaveAttribute('aria-controls', expect.stringMatching(/-content$/));
    expect(document.getElementById(button.getAttribute('aria-controls'))).toBeInTheDocument();
  });

  test('renders to static markup without browser APIs during server-side rendering', () => {
    const html = renderToString(
      <CornPopover id="server-popover" position="bottom-right">
        <CornPopoverTrigger>Open</CornPopoverTrigger>
        <CornPopoverContent><div>Content</div></CornPopoverContent>
      </CornPopover>
    );

    expect(html).toContain('id="server-popover-trigger"');
    expect(html).toContain('aria-controls="server-popover-content"');
    expect(html).toContain('id="server-popover-content"');
    expect(html).toContain('position="bottom-right"');
    expect(html).toContain('aria-labelledby="server-popover-trigger"');
  });
});
