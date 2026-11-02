import { joinClassNames } from '../../utils/class-names.js';
import '../../custom-elements.js';
/**
 * Renders a button bar component with the specified overflow label and children.
 * @param {{ ref?: React.Ref<any>, className?: string, overflowLabel?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornButtonBar({ ref, className = '', overflowLabel, children, ...props }) {
  return (
    <corn-button-bar {...props} ref={ref} className={joinClassNames('corn-button-bar', className)} overflow-label={overflowLabel}>
      {children}
    </corn-button-bar>
  );
}
