import { joinClassNames } from '../../utils/class-names.js';

export function CornModal({ ref, className = '', children, ...props }) {
  return (
    <dialog {...props} ref={ref} className={joinClassNames('corn-modal', 'corn-panel', className)}>
      {children}
    </dialog>
  );
}

export function CornModalHeader({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-modal--header', className)}>
      {children}
    </div>
  );
}

export function CornModalContent({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-modal--content', className)}>
      {children}
    </div>
  );
}
