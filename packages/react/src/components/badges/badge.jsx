import { joinClassNames, modifierClass } from '../../utils/class-names.js';

export function CornBadge({ ref, variant = 'neutral', size = 'md', className = '', children, ...props }) {
  const classNames = joinClassNames('corn-badge', modifierClass('corn-badge--', variant, ['neutral']), modifierClass('corn-badge--', size, ['md']), className);

  return (
    <div {...props} ref={ref} className={classNames}>
      {children}
    </div>
  );
}
