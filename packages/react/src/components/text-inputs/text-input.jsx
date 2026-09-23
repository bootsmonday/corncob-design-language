import { useId } from 'react';
import { CornFormItem } from '../../common/form-item.jsx';
import { joinClassNames } from '../../utils/class-names.js';

const ASSISTIVE_SIZES = new Set(['xs', 'sm']);

export function CornTextInput({ ref, size = 'md', label, id, status, statusVariant, placeholder, disabled, className = '', itemClassName = '', labelClassName, 'aria-invalid': ariaInvalid, ...inputProps }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const resolvedLabelClassName = joinClassNames(ASSISTIVE_SIZES.has(size) && 'corn-assistive-text', labelClassName);
  const itemClasses = joinClassNames(statusVariant && `corn-status--${statusVariant}`, itemClassName);
  const classNames = joinClassNames('corn-text-input', size && `corn-text-input--${size}`, className);

  return (
    <CornFormItem className={itemClasses}>
      <div className={classNames}>
        <input {...inputProps} ref={ref} id={inputId} placeholder={placeholder} disabled={disabled} aria-invalid={ariaInvalid ?? (statusVariant === 'error' ? true : undefined)} />
        <label htmlFor={inputId} className={resolvedLabelClassName || undefined}>
          {label}
        </label>
      </div>
      {status != null ? <div className="corn-status">{status}</div> : null}
    </CornFormItem>
  );
}
