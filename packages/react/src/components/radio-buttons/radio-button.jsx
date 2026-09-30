import { useId, useState } from 'react';
import { assignRef } from '../../utils/assign-ref.js';
import { joinClassNames } from '../../utils/class-names.js';

export function CornRadioButton({ ref, indeterminate = false, size = 'md', id, name, label, className = '', checked, defaultChecked = false, onChange, value, children, ...inputProps }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const classNames = joinClassNames('corn-radio-button', size && `corn-radio-button--${size}`, className);

  const isControlled = checked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] = useState(Boolean(defaultChecked));

  const handleClick = (event) => {
    if (isControlled) {
      onChange?.(event);
      return;
    }

    const nextChecked = !event.currentTarget.checked;
    event.currentTarget.checked = nextChecked;
    setUncontrolledChecked(nextChecked);
    onChange?.(event);
  };

  return (
    <div className={classNames}>
      <input
        {...inputProps}
        ref={(node) => {
          if (node) {
            node.indeterminate = Boolean(indeterminate);
          }
          return assignRef(ref, node);
        }}
        type="radio"
        id={inputId}
        name={name}
        value={value}
        checked={isControlled ? Boolean(checked) : uncontrolledChecked}
        onClick={handleClick}
      />
      <label htmlFor={inputId}>{label ?? children}</label>
    </div>
  );
}
