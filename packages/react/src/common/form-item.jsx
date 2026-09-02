import { forwardRef } from 'react';
import { joinClassNames } from '../utils/class-names.js';

export const CcFormItem = forwardRef(function CcFormItem(
  { as: Component = 'div', className = '', children, ...props },
  ref
) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-form--item', className)}>
      {children}
    </Component>
  );
});
