import { joinClassNames } from '../../utils/class-names.js';

export function CornFooter({ ref, className = '', children, ...props }) {
  return (
    <footer {...props} ref={ref} className={joinClassNames('corn-footer', className)}>
      {children}
    </footer>
  );
}

export function CornFooterIntro({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-footer--intro', className)}>
      {children}
    </div>
  );
}

export function CornFooterContent({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-footer--content', className)}>
      {children}
    </div>
  );
}

export function CornFooterSection({ ref, as: Component = 'div', className = '', title, children, ...props }) {
  return (
    <Component {...props} ref={ref} className={joinClassNames('corn-footer--content--section', className)}>
      {title != null ? <h3>{title}</h3> : null}
      {children}
    </Component>
  );
}

export function CornFooterSocial({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-footer--social', className)}>
      {children}
    </div>
  );
}

export function CornFooterCopyright({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-footer--copyright', className)}>
      {children}
    </div>
  );
}
