import { forwardRef, useId } from 'react';
import { CcFormItem } from '../../common/form-item.jsx';
import { joinClassNames } from '../../utils/class-names.js';

const ASSISTIVE_SIZES = new Set(['xs', 'sm']);

export function buildTextInputClasses({ size = 'md', className = '' } = {}) {
  return joinClassNames(
    'corn-text-input',
    size && size !== 'md' && `corn-text-input--${size}`,
    className
  );
}

export const CcTextInput = forwardRef(function CcTextInput(
  {
    size = 'md',
    label,
    id,
    status,
    statusVariant,
    placeholder,
    disabled,
    className = '',
    itemClassName = '',
    labelClassName,
    'aria-invalid': ariaInvalid,
    ...inputProps
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const resolvedLabelClassName = joinClassNames(
    ASSISTIVE_SIZES.has(size) && 'corn-assistive-text',
    labelClassName
  );
  const itemClasses = joinClassNames(
    statusVariant && `corn-status--${statusVariant}`,
    itemClassName
  );

  return (
    <CcFormItem className={itemClasses}>
      <div className={buildTextInputClasses({ size, className })}>
        <input
          {...inputProps}
          ref={ref}
          id={inputId}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={ariaInvalid ?? (statusVariant === 'error' ? true : undefined)}
        />
        <label htmlFor={inputId} className={resolvedLabelClassName || undefined}>
          {label}
        </label>
      </div>
      {status != null ? <div className="corn-status">{status}</div> : null}
    </CcFormItem>
  );
});
