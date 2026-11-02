import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { CornButton, CornModal, CornModalHeader, CornModalContent } from '../../index.js';

function ModalExample() {
  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <div className="modal-demo">
      <h2>Corn Modal</h2>

      <h3>Default</h3>
      <CornButton type="button" onClick={openModal}>
        Show Modal
      </CornButton>

      <CornModal ref={modalRef} id="corn-modal-example" closedby="any">
        <CornModalHeader>
          <h4>Modal Header</h4>
          <CornButton className="corn-button--icon" size="xs" type="button" aria-label="Close" onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon" aria-hidden="true">
              <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#x"></use>
            </svg>
          </CornButton>
        </CornModalHeader>

        <CornModalContent>
          <p>This is a modal content area.</p>
        </CornModalContent>
      </CornModal>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(<ModalExample />);
