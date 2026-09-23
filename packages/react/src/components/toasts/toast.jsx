import { joinClassNames } from '../../utils/class-names.js';
import '../../../../../src/components/toast/toast.js';

export function CornToast({ ref, className = '', children, ...props }) {
  return (
    <corn-toast {...props} ref={ref} className={joinClassNames('corn-toast', className)}>
      {children}
    </corn-toast>
  );
}
