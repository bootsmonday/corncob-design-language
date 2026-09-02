import { createContext } from 'react';
import { CcFormItem } from '../../common/form-item.jsx';
import { joinClassNames } from '../../utils/class-names.js';

export const CheckboxGroupContext = createContext({ name: undefined });

export function CcCheckboxGroup({
  ref,
  legend,
  name,
  inline = false,
  className = '',
  children,
  ...props
}) {
  return (
    <CcFormItem
      {...props}
      ref={ref}
      as="fieldset"
      className={joinClassNames(
        'corn-checkbox-group',
        inline && 'corn-checkbox-group--inline',
        className
      )}
    >
      {legend != null ? <legend>{legend}</legend> : null}
      <CheckboxGroupContext value={{ name }}>{children}</CheckboxGroupContext>
    </CcFormItem>
  );
}
