import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { CornMessage, CornMessageContent, CornMessageStatus, CornMessageTitle } from './message.jsx';

describe('CornMessage', () => {
  test('renders the base class and default info variant', () => {
    const { container } = render(<CornMessage />);

    expect(container.querySelector('.corn-message')).toHaveClass('corn-message', 'corn-message--info');
  });

  test('applies the variant class', () => {
    const { container } = render(
      <CornMessage variant="success" />
    );

    expect(container.querySelector('.corn-message')).toHaveClass('corn-message', 'corn-message--success');
  });

  test('renders children', () => {
    render(
      <CornMessage>
        <p>Body copy</p>
      </CornMessage>
    );
    expect(screen.getByText('Body copy')).toBeTruthy();
  });

  test('merges className and passes through props', () => {
    const { container } = render(
      <CornMessage className="custom-class" id="message-id" data-testid="message-node" />
    );

    const message = container.querySelector('.corn-message');
    expect(message).toHaveClass('custom-class');
    expect(message).toHaveAttribute('id', 'message-id');
    expect(screen.getByTestId('message-node')).toBe(message);
  });

  test('forwards ref to host element', () => {
    const ref = createRef();
    render(
      <CornMessage ref={ref}>
        <p>Hello</p>
      </CornMessage>
    );

    expect(ref.current).toBe(screen.getByText('Hello').closest('.corn-message'));
  });
});

describe('CornMessage composition subcomponents', () => {
  test('supports the composed message API', () => {
    const { container } = render(
      <CornMessage variant="info">
        <CornMessageStatus>
          <span data-testid="inline-status">!</span>
        </CornMessageStatus>
        <CornMessageContent>
          <CornMessageTitle as="p">Inline title</CornMessageTitle>
          <p>Inline body</p>
        </CornMessageContent>
      </CornMessage>
    );

    expect(container.querySelector('.corn-message')).toHaveClass('corn-message--info');
    expect(container.querySelector('.corn-message--status')).toHaveTextContent('!');
    expect(container.querySelector('.corn-message--title')).toHaveTextContent('Inline title');
    expect(screen.getByText('Inline body')).toBeTruthy();
  });

  test('applies className and passthrough props on subcomponents', () => {
    const { container } = render(
      <>
        <CornMessageStatus className="status-custom" data-testid="status-node">
          !
        </CornMessageStatus>
        <CornMessageContent className="content-custom" data-testid="content-node">
          content
        </CornMessageContent>
        <CornMessageTitle as="p" className="title-custom" data-testid="title-node">
          title
        </CornMessageTitle>
      </>
    );

    expect(screen.getByTestId('status-node')).toHaveClass('corn-message--status', 'status-custom');
    expect(screen.getByTestId('content-node')).toHaveClass('corn-message--content', 'content-custom');
    expect(screen.getByTestId('title-node')).toHaveClass('corn-message--title', 'title-custom');
    expect(container.querySelector('[data-testid="title-node"]').tagName).toBe('P');
  });
});
