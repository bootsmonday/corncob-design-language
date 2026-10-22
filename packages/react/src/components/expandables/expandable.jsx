import { useEffect, useRef } from 'react';
import { joinClassNames } from '../../utils/class-names.js';
import '../../../../../src/components/expandables/expandable.js';

export function CornExpandable({ ref, className = '', open = false, name, children, ...props }) {
  const expandableRef = useRef(null);

  useEffect(() => {
    const node = (ref && typeof ref !== 'function' ? ref.current : null) ?? expandableRef.current;
    if (!node) return;

    if (open) node.setAttribute('open', 'open');
    else node.removeAttribute('open');

    if (name) node.setAttribute('name', String(name));
    else node.removeAttribute('name');

    Object.entries(props).forEach(([key, value]) => {
      if (value === undefined || value === null || value === false) return;
      if (typeof value === 'boolean') {
        if (value) node.setAttribute(key, '');
        else node.removeAttribute(key);
      } else {
        node.setAttribute(key, String(value));
      }
    });
  }, [open, name, props, ref]);

  return (
    <corn-expandable ref={ref ?? expandableRef} className={joinClassNames('corn-expandable', className)}>
      <details slot="details" name={name}>
        {children}
      </details>
    </corn-expandable>
  );
}

export function CornExpandableSummary({ className = '', children, ...props }) {
  return (
    <summary {...props} className={joinClassNames('corn-expandable-button', className)}>
      {children}
    </summary>
  );
}

export function CornExpandableContent({ className = '', children, ...props }) {
  return (
    <div {...props} className={joinClassNames('corn-expandable--content', className)}>
      {children}
    </div>
  );
}

export function CornAccordion({ className = '', children, ...props }) {
  return (
    <div {...props} className={joinClassNames('corn-accordion', className)}>
      {children}
    </div>
  );
}
