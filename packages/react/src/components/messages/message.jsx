import { joinClassNames } from '../../utils/class-names.js';

export function CornMessage({ ref, variant = 'info', className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-message', variant && `corn-message--${variant}`, className)}>
      {children}
    </div>
  );
}

export function CornMessageStatus({ className = '', children, ...props }) {
  return (
    <div {...props} className={joinClassNames('corn-message--status', className)}>
      {children}
    </div>
  );
}

export function CornMessageContent({ className = '', children, ...props }) {
  return (
    <div {...props} className={joinClassNames('corn-message--content', className)}>
      {children}
    </div>
  );
}

export function CornMessageTitle({ as: Component = 'h3', className = '', children, ...props }) {
  return (
    <Component {...props} className={joinClassNames('corn-message--title', className)}>
      {children}
    </Component>
  );
}
