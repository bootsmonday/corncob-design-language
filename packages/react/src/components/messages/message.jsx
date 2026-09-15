import { joinClassNames } from '../../utils/class-names.js';

export function CornMessage({ ref, variant = 'info', title, titleAs: TitleTag = 'h3', status, className = '', children, ...props }) {
  const classes = joinClassNames('corn-message', variant && `corn-message--${variant}`, className);

  return (
    <div {...props} ref={ref} className={classes}>
      {status != null ? <div className="corn-message--status">{status}</div> : null}
      <div className="corn-message--content">
        {title != null ? <TitleTag className="corn-message--title">{title}</TitleTag> : null}
        {children}
      </div>
    </div>
  );
}
