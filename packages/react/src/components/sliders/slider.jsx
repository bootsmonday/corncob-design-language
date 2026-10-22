import { useId } from 'react';
import { CornFormItem } from '../../common/form-item.jsx';
import { joinClassNames } from '../../utils/class-names.js';

export const CORN_SLIDER_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];

export function CornSlider({
  ref,
  id,
  name,
  label,
  size = 'md',
  className = '',
  itemClassName = '',
  labelClassName = '',
  min = 0,
  max = 100,
  step,
  value,
  defaultValue = 50,
  disabled = false,
  onChange,
  children,
  ...inputProps
}) {
  const generatedId = useId();
  const sliderId = id ?? name ?? generatedId;
  const isControlled = value !== undefined;

  return (
    <CornFormItem className={itemClassName}>
      <div className={joinClassNames('corn-slider', size && `corn-slider--${size}`, className)}>
        <label htmlFor={sliderId} className={labelClassName || undefined}>
          {label ?? children}
        </label>
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
    </CornFormItem>
  );
}
