import { joinClassNames } from '../../utils/class-names.js';
import '../../../../../src/components/expandables/expandable.js';

export function CornExpandable({ ref, className = '', open = false, name, children, ...props }) {
  return (
    <corn-expandable {...props} ref={ref} className={joinClassNames('corn-expandable', className)} open={open || undefined}>
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
