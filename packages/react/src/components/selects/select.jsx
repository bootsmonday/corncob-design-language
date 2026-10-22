import { useEffect, useId, useRef } from 'react';
import { joinClassNames } from '../../utils/class-names.js';
import '../../../../../src/components/selects/select.js';
import { CornFormItem } from '../../common/form-item.jsx';

export const CORN_SELECT_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];

export function CornSelectOption({ value, children, ...props }) {
  return (
    <option {...props} value={value ?? children}>
      {children}
    </option>
  );
}

export function CornSelect({ id, className = '', size = 'md', label, name, placeholder, multiple = false, required = false, disabled = false, children, ...props }) {
  const generatedId = useId();
  const selectId = id ?? name ?? generatedId;
  const selectRef = useRef(null);
  const labelClass = size === 'xs' || size === 'sm' ? 'corn-assistive-text' : '';

  useEffect(() => {
    const select = selectRef.current;

    if (!select) return;

    if (name !== undefined && name !== null) {
      select.setAttribute('name', String(name));
    } else {
      select.removeAttribute('name');
    }

    if (placeholder !== undefined && placeholder !== null) {
      select.setAttribute('placeholder', String(placeholder));
    } else {
      select.removeAttribute('placeholder');
    }

    if (multiple) {
      select.setAttribute('multiple', '');
    } else {
      select.removeAttribute('multiple');
    }

    if (required) {
      select.setAttribute('required', '');
    } else {
      select.removeAttribute('required');
    }

    if (disabled) {
      select.setAttribute('disabled', '');
    } else {
      select.removeAttribute('disabled');
    }
  }, [name, placeholder, multiple, required, disabled]);

  return (
    <CornFormItem>
      <div {...props} className={joinClassNames('corn-select', size && `corn-select--${size}`, className)}>
        <corn-select id={selectId} ref={selectRef}>
          {children}
        </corn-select>
        {label ? (
          <label htmlFor={selectId} className={labelClass}>
            {label}
          </label>
        ) : null}
      </div>
    </CornFormItem>
  );
}
