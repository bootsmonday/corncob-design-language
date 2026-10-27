import { joinClassNames } from '../../utils/class-names.js';

/**
 * Renders a panel menu component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, as?: React.ElementType, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornPanelMenu({ ref, as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-panel-menu', className)}>
      {children}
    </Component>
  );
}

/**
 * Renders a panel menu item component with the specified class name, active state, and children.
 * @param {{ ref: React.Ref<any>, as?: React.ElementType, active?: boolean, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornPanelMenuItem({ ref, as: Component = 'a', active = false, className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-panel-menu--item', active && 'corn-panel-menu--item--active', className)} aria-current={active ? 'page' : props['aria-current']}>
      {children}
    </Component>
  );
}

/**
 * Renders a panel menu submenu component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornPanelMenuSubmenu({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-panel-menu--submenu', className)}>
      {children}
    </div>
  );
}
