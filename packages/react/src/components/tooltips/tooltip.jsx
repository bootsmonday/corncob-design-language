import { joinClassNames } from '../../utils/class-names.js';
import '../../custom-elements.js';

export const CORN_TOOLTIP_POSITIONS = ['top', 'right', 'bottom', 'left'];

/**
 * Renders a tooltip component with the specified ref, position, class name, children, and other props.
 * @param {*} param0 The props for the CornTooltip component.
 * @returns {JSX.Element} The rendered CornTooltip component.
 */
export function CornTooltip({ ref, position = 'top', className = '', children, ...props }) {
  return (
    <corn-tooltip {...props} ref={ref} position={position} className={joinClassNames('corn-tooltip', className)}>
      {children}
    </corn-tooltip>
  );
}
