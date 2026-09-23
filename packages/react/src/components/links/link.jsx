import { joinClassNames } from '../../utils/class-names.js';

export function CornLink({ ref, as: Component = 'a', underline = false, className = '', children, ...props }) {
  const classes = joinClassNames(underline ? 'corn-link--underline' : 'corn-link', className);

  return (
    <Component {...props} ref={ref} className={classes}>
      {children}
    </Component>
  );
}

export function CornLinkList({ className = '', children, ...props }) {
  return (
    <ul {...props} className={joinClassNames('corn-link-list', className)}>
      {children}
    </ul>
  );
}
