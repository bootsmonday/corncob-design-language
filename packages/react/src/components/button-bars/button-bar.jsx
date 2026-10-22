import { forwardRef, useEffect, useRef } from 'react';
import { joinClassNames } from '../../utils/class-names.js';
import '../../../../../src/components/button-bars/button-bar.js';
import '../../../../../src/components/popovers/popover.js';

export const CornButtonBar = forwardRef(function CornButtonBar({ className = '', overflowLabel, children, ...props }, ref) {
  const buttonBarRef = useRef(null);

  useEffect(() => {
    const node = (ref && typeof ref !== 'function' ? ref.current : null) ?? buttonBarRef.current;
    if (!node) return;

    if (overflowLabel) node.setAttribute('overflow-label', overflowLabel);
    else node.removeAttribute('overflow-label');

    Object.entries(props).forEach(([key, value]) => {
      if (value === undefined || value === null || value === false) return;
      if (typeof value === 'boolean') {
        if (value) node.setAttribute(key, '');
        else node.removeAttribute(key);
      } else {
        node.setAttribute(key, String(value));
      }
    });
  }, [overflowLabel, props, ref]);

  return (
    <corn-button-bar ref={ref ?? buttonBarRef} className={joinClassNames('corn-button-bar', className)}>
      {children}
    </corn-button-bar>
  );
});
