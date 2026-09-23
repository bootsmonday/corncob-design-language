import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { CornMessage } from './message.jsx';

describe('CornMessage', () => {
  test('renders message structure without a default status icon', () => {
    const { container } = render(
      <CornMessage variant="success" title="Success Message">
        <p>Body copy</p>
      </CornMessage>
    );

    const message = container.querySelector('.corn-message');
    const content = container.querySelector('.corn-message--content');

    expect(message).toHaveClass('corn-message', 'corn-message--success');
    expect(container.querySelector('.corn-message--status')).toBeNull();
    expect(content.querySelector('.corn-message--title')).toHaveTextContent('Success Message');
    expect(screen.getByText('Body copy')).toBeTruthy();
  });

  test('supports header-only title with titleAs="p"', () => {
    const { container } = render(<CornMessage variant="warning" title="This is a warning message." titleAs="p" />);

    const title = container.querySelector('.corn-message--title');
    expect(title.tagName).toBe('P');
    expect(title).toHaveTextContent('This is a warning message.');
  });

  test('supports custom status markup', () => {
    const { container } = render(<CornMessage status={<span data-testid="custom-status">!</span>} title="Info Message" />);

    expect(screen.getByTestId('custom-status')).toBeTruthy();
    expect(container.querySelector('.corn-message--title')).toHaveTextContent('Info Message');
  });

  test('forwards ref to host element', () => {
    const ref = createRef();
    render(<CornMessage ref={ref} title="Hello" />);

    expect(ref.current).toBe(screen.getByText('Hello').closest('.corn-message'));
  });
});
