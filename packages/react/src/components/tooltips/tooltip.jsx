import { useEffect, useRef } from 'react';
import { joinClassNames } from '../../utils/class-names.js';
import '../../../../../src/components/tooltips/tooltip.js';

export const CORN_TOOLTIP_POSITIONS = ['top', 'right', 'bottom', 'left'];

export function CornTooltip({ ref, position = 'top', className = '', children, ...props }) {
  const tooltipRef = useRef(null);

  useEffect(() => {
    const node = (ref && typeof ref !== 'function' ? ref.current : null) ?? tooltipRef.current;
    if (!node) return;

    node.setAttribute('position', position);

    Object.entries(props).forEach(([key, value]) => {
      if (value === undefined || value === null || value === false) return;
      if (typeof value === 'boolean') {
        if (value) node.setAttribute(key, '');
        else node.removeAttribute(key);
      } else {
        node.setAttribute(key, String(value));
      }
    });
  }, [position, props, ref]);

  return (
    <corn-tooltip ref={ref ?? tooltipRef} className={joinClassNames('corn-tooltip', className)}>
      {children}
    </corn-tooltip>
  );
}
