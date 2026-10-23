import { useId } from 'react';
import { FieldStatus, fieldItemClassName, resolveFieldLabel } from '../../common/field.jsx';
import { CornFormItem } from '../../common/form-item.jsx';
import { joinClassNames, modifierClass } from '../../utils/class-names.js';
import '../../custom-elements.js';

export const CORN_SELECT_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];

export function CornSelectOption({ ref, value, children, ...props }) {
  return (
    <option {...props} ref={ref} value={value ?? children}>
      {children}
    </option>
  );
}

export function CornSelect({ ref, id, className = '', size = 'md', label, name, placeholder, multiple = false, required = false, disabled = false, value, status, statusVariant, itemClassName = '', children, ...props }) {
  const generatedId = useId();
  const selectId = id ?? name ?? generatedId;
  const labelText = resolveFieldLabel(label);
  const labelClass = size === 'xs' || size === 'sm' ? 'corn-assistive-text' : undefined;

  return (
    <CornFormItem className={fieldItemClassName(statusVariant, itemClassName)}>
      <div className={joinClassNames('corn-select', modifierClass('corn-select--', size), className)}>
        <corn-select {...props} ref={ref} id={selectId} name={name} placeholder={placeholder} multiple={multiple} required={required} disabled={disabled} value={value}>
          {children}
        </corn-select>
        {labelText != null ? (
          <label htmlFor={selectId} className={labelClass}>
            {labelText}
          </label>
        ) : null}
      </div>
      <FieldStatus status={status} />
    </CornFormItem>
  );
}
