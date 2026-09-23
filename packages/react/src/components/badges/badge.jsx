import { joinClassNames } from '../../utils/class-names.js';

export function CornBadge({ ref, variant = 'neutral', size = 'md', status, className = '', children, ...props }) {
  const variantClass = variant && variant !== 'neutral' ? `corn-badge--${variant}` : '';
  const sizeClass = size && size !== 'md' ? `corn-badge--${size}` : '';
  const classNames = joinClassNames('corn-badge', variantClass, sizeClass, className);

  return (
    <div {...props} ref={ref} className={classNames}>
      <div className="corn-badge--status">{status}</div>
      <div className="corn-badge--content">{children}</div>
    </div>
  );
}
