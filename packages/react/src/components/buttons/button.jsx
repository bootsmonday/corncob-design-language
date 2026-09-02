import { useFormStatus } from 'react-dom';
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

export function CcButton({
  ref,
  variant = 'primary',
  size = 'md',
  icon = false,
  type = 'button',
  as: Component = 'button',
  className = '',
  disabled,
  children,
  ...props
}) {
  const { pending } = useFormStatus();
  const isNativeButton = Component === 'button';
  const isPendingSubmit = isNativeButton && type === 'submit' && pending;

  return (
    <Component
      {...props}
      ref={ref}
      type={isNativeButton ? type : undefined}
      disabled={isNativeButton && type === 'submit' ? (disabled ?? isPendingSubmit) : disabled}
      aria-busy={isPendingSubmit || undefined}
      className={buildButtonClasses({ variant, size, icon, className })}
    >
      {children}
    </Component>
  );
}
