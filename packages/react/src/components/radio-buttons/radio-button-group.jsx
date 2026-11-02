import { CornFormItem } from '../../common/form-item.jsx';
import { withChoiceName } from '../../common/choice-name.js';
import { joinClassNames } from '../../utils/class-names.js';
import { CornRadioButton } from './radio-button.jsx';

/**
 * Renders a radio button group component with the specified legend, name, inline state, class name, and children.
 * @param {{ ref?: React.Ref<any>, legend?: string, name: string, inline?: boolean, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornRadioButtonGroup({ ref, legend, name, inline = false, className = '', children, ...props }) {
  return (
    <CornFormItem {...props} ref={ref} as="fieldset" className={joinClassNames('corn-radio-button-group', inline && 'corn-radio-button-group--inline', className)}>
      {legend != null ? <legend>{legend}</legend> : null}
      {withChoiceName(children, name, [CornRadioButton])}
    </CornFormItem>
  );
}
