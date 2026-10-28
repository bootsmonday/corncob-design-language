import { joinClassNames } from '../../utils/class-names.js';

/**
 * Renders a header component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornHeader({ ref, className = '', children, ...props }) {
  return (
    <header {...props} ref={ref} className={joinClassNames('corn-header', className)}>
      {children}
    </header>
  );
}

/**
 * Renders a header company component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornHeaderCompany({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-company', className)}>
      {children}
    </div>
  );
}

/**
 * Renders a header company logo component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornHeaderCompanyLogo({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-company--logo', className)}>
      {children}
    </div>
  );
}

/**
 * Renders a header company name component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, as?: React.ElementType, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornHeaderCompanyName({ ref, as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-company--name', className)}>
      {children}
    </Component>
  );
}

/**
 * Renders a header title component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, as?: React.ElementType, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornHeaderTitle({ ref, as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-header--title', className)}>
      {children}
    </Component>
  );
}

/**
 * Renders a header navigation component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornHeaderNav({ ref, className = '', children, ...props }) {
  return (
    <nav {...props} ref={ref} className={joinClassNames('corn-header--nav', className)}>
      {children}
    </nav>
  );
}

/**
 * Renders a header actions component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornHeaderActions({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-header--actions', className)}>
      {children}
    </div>
  );
}
