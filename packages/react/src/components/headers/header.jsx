import { joinClassNames } from '../../utils/class-names.js';

export function CornHeader({ ref, className = '', children, ...props }) {
  return (
    <header {...props} ref={ref} className={joinClassNames('corn-header', className)}>
      {children}
    </header>
  );
}

export function CornHeaderCompany({ className = '', children, ...props }) {
  return (
    <div {...props} className={joinClassNames('corn-company', className)}>
      {children}
    </div>
  );
}

export function CornHeaderCompanyLogo({ className = '', children, ...props }) {
  return (
    <div {...props} className={joinClassNames('corn-company--logo', className)}>
      {children}
    </div>
  );
}

export function CornHeaderCompanyName({ as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component {...props} className={joinClassNames('corn-company--name', className)}>
      {children}
    </Component>
  );
}

export function CornHeaderTitle({ as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component {...props} className={joinClassNames('corn-header--title', className)}>
      {children}
    </Component>
  );
}

export function CornHeaderNav({ className = '', children, ...props }) {
  return (
    <nav {...props} className={joinClassNames('corn-header--nav', className)}>
      {children}
    </nav>
  );
}

export function CornHeaderActions({ className = '', children, ...props }) {
  return (
    <div {...props} className={joinClassNames('corn-header--actions', className)}>
      {children}
    </div>
  );
}
