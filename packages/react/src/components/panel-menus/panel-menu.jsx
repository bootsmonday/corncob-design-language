import { joinClassNames } from '../../utils/class-names.js';

export function CornPanelMenu({ ref, as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-panel-menu', className)}>
      {children}
    </Component>
  );
}

export function CornPanelMenuItem({ ref, as: Component = 'a', active = false, className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-panel-menu--item', active && 'corn-panel-menu--item--active', className)} aria-current={active ? 'page' : props['aria-current']}>
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
