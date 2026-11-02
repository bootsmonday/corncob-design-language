import { createRef } from 'react';
import { render } from '@testing-library/react';
import { CornModal, CornModalHeader, CornModalContent } from './modal.jsx';

describe('CornModal', () => {
  test('renders modal dialog structure with panel class', () => {
    const { container } = render(
      <CornModal id="corn-modal-example" closedby="any">
        <CornModalHeader>
          <h4>Modal Header</h4>
        </CornModalHeader>
        <CornModalContent>
          <p>This is a modal content area.</p>
        </CornModalContent>
      </CornModal>
    );

    const dialog = container.querySelector('dialog#corn-modal-example');
    expect(dialog).toHaveClass('corn-modal', 'corn-panel');
    expect(dialog).toHaveAttribute('closedby', 'any');
    expect(container.querySelector('.corn-modal--header h4')).toHaveTextContent('Modal Header');
    expect(container.querySelector('.corn-modal--content p')).toHaveTextContent('This is a modal content area.');
  });

  test('forwards ref to dialog element', () => {
    const ref = createRef();
    render(<CornModal ref={ref}>Hello</CornModal>);

    expect(ref.current.tagName).toBe('DIALOG');
    expect(ref.current).toHaveClass('corn-modal', 'corn-panel');
  });
});
