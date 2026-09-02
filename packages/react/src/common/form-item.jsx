import { joinClassNames } from '../utils/class-names.js';

export function CcFormItem({
  ref,
  as: Component = 'div',
  className = '',
  children,
  ...props
}) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-form--item', className)}>
      {children}
    </Component>
  );
}
