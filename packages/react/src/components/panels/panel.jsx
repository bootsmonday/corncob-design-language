import { joinClassNames } from '../../utils/class-names.js';

/**
 * Renders a panel component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, as?: React.ElementType, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornPanel({ ref, as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-panel', className)}>
      {children}
    </Component>
  );
}
