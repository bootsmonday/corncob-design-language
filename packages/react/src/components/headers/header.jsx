import { joinClassNames } from '../../utils/class-names.js';

export function CornHeader({ ref, className = '', children, ...props }) {
  return (
    <header {...props} ref={ref} className={joinClassNames('corn-header', className)}>
      {children}
    </header>
  );
}

export function CornHeaderCompany({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-company', className)}>
      {children}
    </div>
  );
}

export function CornHeaderCompanyLogo({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-company--logo', className)}>
      {children}
    </div>
  );
}

export function CornHeaderCompanyName({ ref, as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-company--name', className)}>
      {children}
    </Component>
  );
}

export function CornHeaderTitle({ ref, as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-header--title', className)}>
      {children}
    </Component>
  );
}

export function CornHeaderNav({ ref, className = '', children, ...props }) {
  return (
    <nav {...props} ref={ref} className={joinClassNames('corn-header--nav', className)}>
      {children}
    </nav>
  );
}

export function CornHeaderActions({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-header--actions', className)}>
      {children}
    </div>
  );
}
