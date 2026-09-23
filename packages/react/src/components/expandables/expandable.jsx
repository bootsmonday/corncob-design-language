import { joinClassNames } from '../../utils/class-names.js';
import '../../../../../src/components/expandables/expandable.js';

function ExpandableChevronIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon" aria-hidden="true">
      <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#chevron-right"></use>
    </svg>
  );
}

export function CornExpandable({ ref, className = '', summary, open = false, name, icon = <ExpandableChevronIcon />, iconPosition = 'end', children, ...props }) {
  return (
    <corn-expandable {...props} ref={ref} className={joinClassNames('corn-expandable', className)} open={open || undefined}>
      <details slot="details" name={name}>
        <summary className="corn-expandable-button">
          {iconPosition === 'start' ? icon : null}
          {summary}
          {iconPosition !== 'start' ? icon : null}
        </summary>
        <div className="corn-expandable--content">{children}</div>
      </details>
    </corn-expandable>
  );
}

export function CornAccordion({ className = '', children, ...props }) {
  return (
    <div {...props} className={joinClassNames('corn-accordion', className)}>
      {children}
    </div>
  );
}
