import { useContext, useId } from 'react';
import { assignRef } from '../../utils/assign-ref.js';
import { joinClassNames } from '../../utils/class-names.js';
import { CheckboxGroupContext } from './checkbox-group.jsx';

export function buildCheckboxClasses({ size = 'md', task = false, className = '' } = {}) {
  return joinClassNames(
    'corn-checkbox',
    size && size !== 'md' && `corn-checkbox--${size}`,
    task && 'corn-checkbox--task',
    className
  );
}

export function CcCheckbox({
  ref,
  size = 'md',
  task = false,
  indeterminate = false,
  id,
  name,
  label,
  className = '',
  children,
  ...inputProps
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const group = useContext(CheckboxGroupContext);

  return (
    <div className={buildCheckboxClasses({ size, task, className })}>
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
        name={name ?? group?.name}
      />
      <label htmlFor={inputId}>{label ?? children}</label>
    </div>
  );
}
