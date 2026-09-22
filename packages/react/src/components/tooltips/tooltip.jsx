import { joinClassNames } from '../../utils/class-names.js';
import '../../../../../src/components/tooltips/tooltip.js';

export const CORN_TOOLTIP_POSITIONS = ['top', 'right', 'bottom', 'left'];

export function CornTooltip({ ref, position = 'top', className = '', children, ...props }) {
  return (
    <corn-tooltip {...props} ref={ref} position={position} className={joinClassNames('corn-tooltip', className)}>
      {children}
    </corn-tooltip>
  );
}
