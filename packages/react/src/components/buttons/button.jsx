import { forwardRef } from 'react';
import { joinClassNames } from '../../utils/class-names.js';

export function buildButtonClasses({
  variant = 'primary',
  size = 'md',
  icon = false,
  className = '',
} = {}) {
  return joinClassNames(
    'corn-button',
    variant && variant !== 'primary' && `corn-button--${variant}`,
    size && size !== 'md' && `corn-button--${size}`,
    icon && 'corn-button--icon',
    className
  );
}

export const CcButton = forwardRef(function CcButton(
  {
    variant = 'primary',
    size = 'md',
    icon = false,
    type = 'button',
    as: Component = 'button',
    className = '',
    children,
    ...props
  },
  ref
) {
  return (
    <Component
      {...props}
      ref={ref}
      type={Component === 'button' ? type : undefined}
      className={buildButtonClasses({ variant, size, icon, className })}
    >
      {children}
    </Component>
  );
});
