import { joinClassNames } from '../../utils/class-names.js';
import '../../custom-elements.js';

export function CornButtonBar({ ref, className = '', overflowLabel, children, ...props }) {
  return (
    <corn-button-bar {...props} ref={ref} className={joinClassNames('corn-button-bar', className)} overflow-label={overflowLabel}>
      {children}
    </corn-button-bar>
  );
}
