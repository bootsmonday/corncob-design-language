import { joinClassNames } from '../utils/class-names.js';

/**
 * Renders a form item component with the specified props and children.
 * @param {{ ref?: React.Ref<any>, as?: React.ElementType, className?: string, children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export function CornFormItem({ ref, as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-form--item', className)}>
      {children}
    </Component>
  );
}
