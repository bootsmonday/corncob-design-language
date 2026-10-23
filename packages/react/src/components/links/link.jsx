import { joinClassNames } from '../../utils/class-names.js';

export function CornLink({ ref, as: Component = 'a', underline = false, className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-link', underline && 'corn-link--underline', className)}>
      {children}
    </Component>
  );
}

export function CornLinkList({ ref, className = '', children, ...props }) {
  return (
    <ul {...props} ref={ref} className={joinClassNames('corn-link-list', className)}>
      {children}
    </ul>
  );
}
