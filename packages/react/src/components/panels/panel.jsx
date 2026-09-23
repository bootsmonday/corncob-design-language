import { joinClassNames } from '../../utils/class-names.js';

export function CornPanel({ ref, as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-panel', className)}>
      {children}
    </Component>
  );
}
