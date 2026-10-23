import { useRef } from 'react';
import { CornButton, CornModal, CornModalHeader, CornModalContent } from '@bootsmonday/corncob-design-language-react';
import SpriteIcon from './SpriteIcon.jsx';

export default function ReactModalExample() {
  const modalRef = useRef(null);

  return (
    <>
      <CornButton type="button" onClick={() => modalRef.current?.showModal()}>
        Show Modal
      </CornButton>

      <CornModal ref={modalRef} closedby="any">
        <CornModalHeader>
          <h4>Modal Header</h4>
          <CornButton className="corn-button--icon" size="xs" type="button" aria-label="Close" onClick={() => modalRef.current?.close()}>
            <SpriteIcon icon="x-lg" aria-hidden="true" />
          </CornButton>
        </CornModalHeader>

        <CornModalContent>
          <p>This is a modal content area.</p>
        </CornModalContent>
      </CornModal>
    </>
  );
}
