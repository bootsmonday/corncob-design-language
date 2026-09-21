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
    <Component {...props} ref={ref} className={joinClassNames('corn-panel-menu--item', active && 'corn-panel-menu--item--active', className)}>
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

export function CornPanelMenuExpandable({ ref, className = '', summary, summaryClassName = '', contentClassName = '', icon = null, children, ...props }) {
  return (
    <corn-expandable {...props} ref={ref} className={joinClassNames('corn-expandable', className)}>
      <details slot="details">
        <summary className={joinClassNames('corn-panel-menu--item', 'corn-expandable-button', summaryClassName)}>
          {summary}
          {icon}
        </summary>
        <div className={joinClassNames('corn-expandable--content', contentClassName)}>{children}</div>
      </details>
    </corn-expandable>
  );
}
