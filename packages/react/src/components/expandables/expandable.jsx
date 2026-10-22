import { joinClassNames } from '../../utils/class-names.js';
import '../../custom-elements.js';

export function CornExpandable({ ref, className = '', open, name, children, ...props }) {
  return (
    <corn-expandable {...props} ref={ref} className={joinClassNames('corn-expandable', className)} open={open}>
      <details slot="details" name={name}>
        {children}
      </details>
    </corn-expandable>
  );
}

export function CornExpandableSummary({ ref, className = '', children, ...props }) {
  return (
    <summary {...props} ref={ref} className={joinClassNames('corn-expandable-button', className)}>
      {children}
    </summary>
  );
}

export function CornExpandableContent({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-expandable--content', className)}>
      {children}
    </div>
  );
}

export function CornAccordion({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-accordion', className)}>
      {children}
    </div>
  );
}
