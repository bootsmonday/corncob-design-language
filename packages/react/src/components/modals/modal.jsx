import { joinClassNames } from '../../utils/class-names.js';

/**
 * Renders a modal component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornModal({ ref, className = '', children, ...props }) {
  return (
    <dialog {...props} ref={ref} className={joinClassNames('corn-modal', 'corn-panel', className)}>
      {children}
    </dialog>
  );
}

/**
 * Renders a modal header component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornModalHeader({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-modal--header', className)}>
      {children}
    </div>
  );
}

/**
 * Renders a modal content component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornModalContent({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-modal--content', className)}>
      {children}
    </div>
  );
}
