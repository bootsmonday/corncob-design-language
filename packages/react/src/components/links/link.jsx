import { joinClassNames } from '../../utils/class-names.js';

/**
 * Renders a link component with the specified class name, underline option, and children.
 * @param {{ ref: React.Ref<any>, as?: React.ElementType, underline?: boolean, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornLink({ ref, as: Component = 'a', underline = false, className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-link', underline && 'corn-link--underline', className)}>
      {children}
    </Component>
  );
}

/**
 * Renders a link list component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornLinkList({ ref, className = '', children, ...props }) {
  return (
    <ul {...props} ref={ref} className={joinClassNames('corn-link-list', className)}>
      {children}
    </ul>
  );
}
