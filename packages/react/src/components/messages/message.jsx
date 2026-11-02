import { joinClassNames, modifierClass } from '../../utils/class-names.js';

/**
 * Renders a message component with the specified variant, class name, and children.
 * @param {{ ref?: React.Ref<any>, variant?: 'info' | 'success' | 'warning' | 'error', className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornMessage({ ref, variant = 'info', className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-message', modifierClass('corn-message--', variant), className)}>
      {children}
    </div>
  );
}

/**
 * Renders a message status component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornMessageStatus({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-message--status', className)}>
      {children}
    </div>
  );
}

/**
 * Renders a message content component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornMessageContent({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-message--content', className)}>
      {children}
    </div>
  );
}

/**
 * Renders a message title component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, as?: React.ElementType, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornMessageTitle({ ref, as: Component = 'h3', className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-message--title', className)}>
      {children}
    </Component>
  );
}
