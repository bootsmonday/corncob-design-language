import { useId } from 'react';
import { FieldStatus, fieldItemClassName, resolveFieldLabel } from '../../common/field.jsx';
import { CornFormItem } from '../../common/form-item.jsx';
import { joinClassNames, modifierClass } from '../../utils/class-names.js';

export const CORN_SLIDER_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];

/**
 * Renders a slider component with the specified ref, id, name, label, size, class name, item class name, label class name, status, status variant, min, max, step, value, default value, disabled state, change handler, and children.
 * @param {*} param0 The props for the CornSlider component.
 * @returns {JSX.Element} The rendered CornSlider component.
 */
export function CornSlider({ ref, id, name, label, size = 'md', className = '', itemClassName = '', labelClassName = '', status, statusVariant, min = 0, max = 100, step, value, defaultValue = 50, disabled = false, onChange, children, ...inputProps }) {
  const generatedId = useId();
  const sliderId = id ?? name ?? generatedId;
  const isControlled = value !== undefined;
  const labelText = resolveFieldLabel(label, children);

  return (
    <CornFormItem className={fieldItemClassName(statusVariant, itemClassName)}>
      <div className={joinClassNames('corn-slider', modifierClass('corn-slider--', size), className)}>
        {labelText != null ? (
          <label htmlFor={sliderId} className={labelClassName || undefined}>
            {labelText}
          </label>
        ) : null}
        <input
          {...inputProps}
          ref={ref}
          type="range"
          id={sliderId}
          name={name}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          value={isControlled ? value : undefined}
          defaultValue={!isControlled ? defaultValue : undefined}
          onChange={(event) => {
            onChange?.(event);
          }}
        />
      </div>
      <FieldStatus status={status} />
    </CornFormItem>
  );
}
