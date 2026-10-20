import { joinClassNames } from '../../utils/class-names.js';
import { CornExpandable, CornExpandableContent, CornExpandableSummary } from '../expandables/expandable.jsx';
import '../../../../../src/components/expandables/expandable.js';

export function CornPanelMenu({ ref, as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-panel-menu', className)}>
      {children}
    </Component>
  );
}

export function CornPanelMenuItem({ ref, as: Component = 'a', active = false, className = '', children, ...props }) {
  const resolvedClassName =
    typeof className === 'function'
      ? joinClassNames('corn-panel-menu--item', className({ isActive: active }), active && 'corn-panel-menu--item--active')
      : joinClassNames('corn-panel-menu--item', active && 'corn-panel-menu--item--active', className);

  return (
    <Component {...props} ref={ref} className={resolvedClassName} aria-current={active ? 'page' : props['aria-current']}>
      {children}
    </Component>
  );
}

export function CornPanelMenuSubmenu({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-panel-menu--submenu', className)}>
      {children}
    </div>
  );
}

export function CornPanelMenuExpandable({ ref, className = '', children, ...props }) {
  return (
    <CornExpandable {...props} ref={ref} className={className}>
      {children}
    </CornExpandable>
  );
}
