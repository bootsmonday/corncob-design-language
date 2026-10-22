import { CornFormItem } from '../../common/form-item.jsx';
import { withChoiceName } from '../../common/choice-name.js';
import { joinClassNames } from '../../utils/class-names.js';
import { CornCheckbox } from './checkbox.jsx';

export function CornCheckboxGroup({ ref, legend, name, inline = false, className = '', children, ...props }) {
  return (
    <CornFormItem {...props} ref={ref} as="fieldset" className={joinClassNames('corn-checkbox-group', inline && 'corn-checkbox-group--inline', className)}>
      {legend != null ? <legend>{legend}</legend> : null}
      {withChoiceName(children, name, [CornCheckbox])}
    </CornFormItem>
  );
}
