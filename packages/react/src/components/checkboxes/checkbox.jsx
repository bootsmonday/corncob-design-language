import { useCallback, useEffect, useId, useRef } from 'react';
import { assignRef } from '../../utils/assign-ref.js';
import { joinClassNames, modifierClass } from '../../utils/class-names.js';

export function CornCheckbox({ ref, size = 'md', task = false, indeterminate = false, id, name, label, className = '', checked, defaultChecked = false, onChange, value, children, ...inputProps }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef(null);
  const classNames = joinClassNames('corn-checkbox', modifierClass('corn-checkbox--', size), task && 'corn-checkbox--task', className);
  const isControlled = checked !== undefined;
  const setInputRef = useCallback(
    (node) => {
      inputRef.current = node;
      return assignRef(ref, node);
    },
    [ref]
  );

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);

  return (
    <div className={classNames}>
      <input
        {...inputProps}
        ref={setInputRef}
        type="checkbox"
        id={inputId}
        name={name}
        value={value}
        checked={isControlled ? Boolean(checked) : undefined}
        defaultChecked={!isControlled ? Boolean(defaultChecked) : undefined}
        onChange={(event) => {
          onChange?.(event);
        }}
      />
      <label htmlFor={inputId}>{label ?? children}</label>
    </div>
  );
}
