import { useId } from 'react';
import { joinClassNames } from '../../utils/class-names.js';

export function CornRadioButton({ ref, size = 'md', id, name, label, className = '', checked, defaultChecked = false, onChange, value, children, ...inputProps }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const classNames = joinClassNames('corn-radio-button', size && `corn-radio-button--${size}`, className);

  const isControlled = checked !== undefined;

  return (
    <div className={classNames}>
      <input
        {...inputProps}
        ref={ref}
        type="radio"
        id={inputId}
        name={name}
        value={value}
        checked={isControlled ? Boolean(checked) : undefined}
        defaultChecked={!isControlled ? Boolean(defaultChecked) : undefined}
        onChange={(event) => {
          if (isControlled && onChange) {
            onChange(event);
          }
        }}
      />
      <label htmlFor={inputId}>{label ?? children}</label>
    </div>
  );
}
