import { useId } from 'react';
import { FieldStatus, fieldItemClassName, resolveFieldLabel } from '../../common/field.jsx';
import { CornFormItem } from '../../common/form-item.jsx';
import { joinClassNames, modifierClass } from '../../utils/class-names.js';

const ASSISTIVE_SIZES = new Set(['xs', 'sm']);

/**
 * Renders a text input component with the specified ref, size, label, id, status, status variant, placeholder, disabled state, class name, item class name, label class name, aria-invalid state, and children.
 * @param {*} param0 The props for the CornTextInput component.
 * @returns {JSX.Element} The rendered CornTextInput component.
 */
export function CornTextInput({ ref, size = 'md', label, id, status, statusVariant, placeholder, disabled, className = '', itemClassName = '', labelClassName, 'aria-invalid': ariaInvalid, children, ...inputProps }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const labelText = resolveFieldLabel(label, children);
  const resolvedLabelClassName = joinClassNames(ASSISTIVE_SIZES.has(size) && 'corn-assistive-text', labelClassName);
  const classNames = joinClassNames('corn-text-input', modifierClass('corn-text-input--', size), className);

  return (
    <CornFormItem className={fieldItemClassName(statusVariant, itemClassName)}>
      <div className={classNames}>
        <input {...inputProps} ref={ref} id={inputId} placeholder={placeholder} disabled={disabled} aria-invalid={ariaInvalid ?? (statusVariant === 'error' ? true : undefined)} />
        {labelText != null ? (
          <label htmlFor={inputId} className={resolvedLabelClassName || undefined}>
            {labelText}
          </label>
        ) : null}
      </div>
      <FieldStatus status={status} />
    </CornFormItem>
  );
}
