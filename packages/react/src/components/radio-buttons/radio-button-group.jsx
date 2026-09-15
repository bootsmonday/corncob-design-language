import { Children, cloneElement, isValidElement } from 'react';
import { CornFormItem } from '../../common/form-item.jsx';
import { joinClassNames } from '../../utils/class-names.js';

export function CornRadioButtonGroup({ ref, legend, name, inline = false, className = '', children, ...props }) {
  const childrenWithGroupName = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    if (child.props.name != null) return child;
    return cloneElement(child, { name });
  });

  return (
    <CornFormItem {...props} ref={ref} as="fieldset" className={joinClassNames('corn-radio-button-group', inline && 'corn-radio-button-group--inline', className)}>
      {legend != null ? <legend>{legend}</legend> : null}
      {childrenWithGroupName}
    </CornFormItem>
  );
}
