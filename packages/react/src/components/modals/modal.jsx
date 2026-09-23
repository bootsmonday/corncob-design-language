import { joinClassNames } from '../../utils/class-names.js';

export function CornModal({ ref, className = '', children, ...props }) {
  return (
    <dialog {...props} ref={ref} className={joinClassNames('corn-modal', 'corn-panel', className)}>
      {children}
    </dialog>
  );
}

export function CornModalHeader({ className = '', children, ...props }) {
  return (
    <div {...props} className={joinClassNames('corn-modal--header', className)}>
      {children}
    </div>
  );
}

export function CornModalContent({ className = '', children, ...props }) {
  return (
    <div {...props} className={joinClassNames('corn-modal--content', className)}>
      {children}
    </div>
  );
}
