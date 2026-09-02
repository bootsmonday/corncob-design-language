import { forwardRef, useContext, useEffect, useId, useRef } from 'react';
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

export const CcCheckbox = forwardRef(function CcCheckbox(
  {
    size = 'md',
    task = false,
    indeterminate = false,
    id,
    name,
    label,
    className = '',
    children,
    ...inputProps
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const group = useContext(CheckboxGroupContext);
  const innerRef = useRef(null);

  const setRefs = (node) => {
    innerRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  return (
    <div className={buildCheckboxClasses({ size, task, className })}>
      <input
        {...inputProps}
        ref={setRefs}
        type="checkbox"
        id={inputId}
        name={name ?? group?.name}
      />
      <label htmlFor={inputId}>{label ?? children}</label>
    </div>
  );
});
