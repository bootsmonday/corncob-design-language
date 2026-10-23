import { joinClassNames, modifierClass } from '../../utils/class-names.js';

export function CornMessage({ ref, variant = 'info', className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-message', modifierClass('corn-message--', variant), className)}>
      {children}
    </div>
  );
}

export function CornMessageStatus({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-message--status', className)}>
      {children}
    </div>
  );
}

export function CornMessageContent({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-message--content', className)}>
      {children}
    </div>
  );
}

export function CornMessageTitle({ ref, as: Component = 'h3', className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-message--title', className)}>
      {children}
    </Component>
  );
}
