import { useEffect, useRef } from 'react';
import { joinClassNames } from '../../utils/class-names.js';
import '../../../../../src/components/toast/toast.js';

export function CornToast({ ref, className = '', children, ...props }) {
  const toastRef = useRef(null);

  useEffect(() => {
    const node = (ref && typeof ref !== 'function' ? ref.current : null) ?? toastRef.current;
    if (!node) return;

    Object.entries(props).forEach(([key, value]) => {
      if (value === undefined || value === null || value === false) return;
      if (typeof value === 'boolean') {
        if (value) node.setAttribute(key, '');
        else node.removeAttribute(key);
      } else {
        node.setAttribute(key, String(value));
      }
    });
  }, [props, ref]);

  return (
    <corn-toast ref={ref ?? toastRef} className={joinClassNames('corn-toast', className)}>
      {children}
    </corn-toast>
  );
}
