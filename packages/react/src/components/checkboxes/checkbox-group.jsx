import { createContext, forwardRef } from 'react';
import { CcFormItem } from '../../common/form-item.jsx';
import { joinClassNames } from '../../utils/class-names.js';

export const CheckboxGroupContext = createContext({ name: undefined });

export const CcCheckboxGroup = forwardRef(function CcCheckboxGroup(
  { legend, name, inline = false, className = '', children, ...props },
  ref
) {
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
      <CheckboxGroupContext.Provider value={{ name }}>{children}</CheckboxGroupContext.Provider>
    </CcFormItem>
  );
});
