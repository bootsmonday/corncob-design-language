import { CornFormItem } from '../../common/form-item.jsx';
import { withChoiceName } from '../../common/choice-name.js';
import { joinClassNames } from '../../utils/class-names.js';
import { CornCheckbox } from './checkbox.jsx';

/**
 * Renders a checkbox group component with the specified legend, name, inline display, and children.
 * @param {{ ref: React.Ref<any>, legend?: string, name: string, inline?: boolean, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornCheckboxGroup({ ref, legend, name, inline = false, className = '', children, ...props }) {
  return (
    <CornFormItem {...props} ref={ref} as="fieldset" className={joinClassNames('corn-checkbox-group', inline && 'corn-checkbox-group--inline', className)}>
      {legend != null ? <legend>{legend}</legend> : null}
      {withChoiceName(children, name, [CornCheckbox])}
    </CornFormItem>
  );
}
