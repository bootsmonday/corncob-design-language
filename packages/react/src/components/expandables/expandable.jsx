import { joinClassNames } from '../../utils/class-names.js';
import '../../custom-elements.js';

/**
 * Renders an expandable component with the specified open state, name, and children.
 * @param {{ ref?: React.Ref<any>, className?: string, open?: boolean, name?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornExpandable({ ref, className = '', open, name, children, ...props }) {
  return (
    <corn-expandable {...props} ref={ref} className={joinClassNames('corn-expandable', className)} open={open}>
      <details slot="details" name={name}>
        {children}
      </details>
    </corn-expandable>
  );
}

/**
 * Renders an expandable summary component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornExpandableSummary({ ref, className = '', children, ...props }) {
  return (
    <summary {...props} ref={ref} className={joinClassNames('corn-expandable-button', className)}>
      {children}
    </summary>
  );
}

/**
 * Renders an expandable content component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornExpandableContent({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-expandable--content', className)}>
      {children}
    </div>
  );
}

/**
 * Renders an accordion component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornAccordion({ ref, className = '', children, ...props }) {
  return (
    <div {...props} ref={ref} className={joinClassNames('corn-accordion', className)}>
      {children}
    </div>
  );
}
