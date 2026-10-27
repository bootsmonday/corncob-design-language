import { useId } from 'react';
import { CornFormItem } from '../../common/form-item.jsx';
import { withChoiceName } from '../../common/choice-name.js';
import { joinClassNames, modifierClass } from '../../utils/class-names.js';

export const CORN_TOGGLE_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];

/**
 * Renders a toggle component with the specified ref, id, name, label, class name, checked state, default checked state, disabled state, change handler, value, and children.
 * @param {*} param0 The props for the CornToggle component.
 * @returns {JSX.Element} The rendered CornToggle component.
 */
export function CornToggle({ ref, id, name, label, className = '', checked, defaultChecked = false, disabled = false, onChange, value, children, ...inputProps }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const isControlled = checked !== undefined;

  return (
    <div className={joinClassNames('corn-toggle', className)}>
      <input
        {...inputProps}
        ref={ref}
        type="radio"
        id={inputId}
        name={name}
        value={value}
        disabled={disabled}
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

/**
 * Renders a toggle group component with the specified ref, legend, name, size, class name, toggles class name, and children.
 * @param {*} param0 The props for the CornToggleGroup component.
 * @returns {JSX.Element} The rendered CornToggleGroup component.
 */
export function CornToggleGroup({ ref, legend, name, size = 'md', className = '', togglesClassName = '', children, ...props }) {
  return (
    <CornFormItem {...props} ref={ref} as="fieldset" className={joinClassNames('corn-toggle-group', modifierClass('corn-toggle--', size), className)}>
      {legend != null ? <legend>{legend}</legend> : null}
      <div className={joinClassNames('corn-toggles', togglesClassName)}>{withChoiceName(children, name, [CornToggle])}</div>
    </CornFormItem>
  );
}
