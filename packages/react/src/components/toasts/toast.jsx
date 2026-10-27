import { joinClassNames } from '../../utils/class-names.js';
import '../../custom-elements.js';

/**
 * Renders a toast component with the specified ref, class name, children, and other props.
 * @param {*} param0 The props for the CornToast component.
 * @returns {JSX.Element} The rendered CornToast component.
 */
export function CornToast({ ref, className = '', children, ...props }) {
  return (
    <corn-toast {...props} ref={ref} className={joinClassNames('corn-toast', className)}>
      {children}
    </corn-toast>
  );
}
