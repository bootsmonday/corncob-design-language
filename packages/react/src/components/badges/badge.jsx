import { joinClassNames, modifierClass } from '../../utils/class-names.js';

/**
 * Renders a badge component with the specified variant, size, and children.
 * @param {{ ref?: React.Ref<any>, variant?: string, size?: string, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornBadge({ ref, variant = 'neutral', size = 'md', className = '', children, ...props }) {
  const classNames = joinClassNames('corn-badge', modifierClass('corn-badge--', variant, ['neutral']), modifierClass('corn-badge--', size, ['md']), className);

  return (
    <div {...props} ref={ref} className={classNames}>
      {children}
    </div>
  );
}
