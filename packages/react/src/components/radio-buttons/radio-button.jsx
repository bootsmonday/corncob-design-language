import { useId } from 'react';
import { joinClassNames, modifierClass } from '../../utils/class-names.js';

/**
 * Renders a radio button component with the specified size, id, name, label, class name, checked state, default checked state, change handler, value, and children.
 * @param {{ ref: React.Ref<any>, size?: string, id?: string, name: string, label?: string, className?: string, checked?: boolean, defaultChecked?: boolean, onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void, value?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornRadioButton({ ref, size = 'md', id, name, label, className = '', checked, defaultChecked = false, onChange, value, children, ...inputProps }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const classNames = joinClassNames('corn-radio-button', modifierClass('corn-radio-button--', size), className);
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
          onChange?.(event);
        }}
      />
      <label htmlFor={inputId}>{label ?? children}</label>
    </div>
  );
}
