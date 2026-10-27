import { joinClassNames } from '../../utils/class-names.js';

/**
 * Renders a footer component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornFooter({ ref, className = '', children, ...props }) {
  return (
    <footer {...props} ref={ref} className={joinClassNames('corn-footer', className)}>
      {children}
    </footer>
  );
}

/**
 * Renders a footer intro component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornFooterIntro({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-footer--intro', className)}>
      {children}
    </div>
  );
}

/**
 * Renders a footer content component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornFooterContent({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-footer--content', className)}>
      {children}
    </div>
  );
}

/**
 * Renders a footer section component with the specified class name, title, and children.
 * @param {{ ref: React.Ref<any>, as?: React.ElementType, className?: string, title?: React.ReactNode, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornFooterSection({ ref, as: Component = 'div', className = '', title, children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-footer--content--section', className)}>
      {title != null ? <h3>{title}</h3> : null}
      {children}
    </Component>
  );
}

/**
 * Renders a footer social component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornFooterSocial({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-footer--social', className)}>
      {children}
    </div>
  );
}

/**
 * Renders a footer copyright component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornFooterCopyright({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-footer--copyright', className)}>
      {children}
    </div>
  );
}
