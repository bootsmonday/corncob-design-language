import { joinClassNames } from '../utils/class-names.js';

export function CornFormItem({ ref, as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-form--item', className)}>
      {children}
    </Component>
  );
}
