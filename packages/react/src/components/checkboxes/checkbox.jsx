import { useId } from 'react';
import { assignRef } from '../../utils/assign-ref.js';
import { joinClassNames } from '../../utils/class-names.js';

export function CornCheckbox({ ref, size = 'md', task = false, indeterminate = false, id, name, label, className = '', checked, defaultChecked = false, onChange, value, children, ...inputProps }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const classNames = joinClassNames('corn-checkbox', size && `corn-checkbox--${size}`, task && 'corn-checkbox--task', className);

  const isControlled = checked !== undefined;

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
        type="checkbox"
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
