import { forwardRef } from 'react';
import { joinClassNames } from '../../utils/class-names.js';
import '../../../../../src/components/button-bars/button-bar.js';
import '../../../../../src/components/popovers/popover.js';

export const CornButtonBar = forwardRef(function CornButtonBar({ className = '', overflowLabel, children, ...props }, ref) {
  return (
    <corn-button-bar {...props} ref={ref} overflow-label={overflowLabel} className={joinClassNames('corn-button-bar', className)}>
      {children}
    </corn-button-bar>
  );
});
