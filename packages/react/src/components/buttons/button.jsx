import { useFormStatus } from 'react-dom';
import { joinClassNames } from '../../utils/class-names.js';

export function CornButton({ ref, variant = 'primary', size = 'md', icon = false, type = 'button', as: Component = 'button', className = '', disabled, children, ...props }) {
  const { pending } = useFormStatus();
  const isNativeButton = Component === 'button';
  const isPendingSubmit = isNativeButton && type === 'submit' && pending;
  const classNames = joinClassNames('corn-button', variant && `corn-button--${variant}`, size && `corn-button--${size}`, icon && 'corn-button--icon', className);
  return (
    <Component {...props} ref={ref} type={isNativeButton ? type : undefined} disabled={isNativeButton && type === 'submit' ? (disabled ?? isPendingSubmit) : disabled} aria-busy={isPendingSubmit || undefined} className={classNames}>
      {children}
    </Component>
  );
}
