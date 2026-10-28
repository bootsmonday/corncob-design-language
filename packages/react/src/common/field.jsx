import { joinClassNames } from '../utils/class-names.js';

/**
 * Resolves the label for a field based on the provided label and children.
 * @param {string} label
 * @param {React.ReactNode} children
 * @returns {string|null}
 */
export function resolveFieldLabel(label, children) {
  if (label != null && label !== '') return label;
  if (children != null && children !== '') return children;
  return null;
}

/**
 * Returns the class name for a field item based on the status variant and additional class names.
 * @param {string} statusVariant
 * @param {string} itemClassName
 * @returns {string}
 */
export function fieldItemClassName(statusVariant, itemClassName = '') {
  return joinClassNames(statusVariant && `corn-status--${statusVariant}`, itemClassName);
}

/**
 * Returns the status element for a field if the status is provided.
 * @param {{ status: string }} param0
 * @returns {JSX.Element|null}
 */
export function FieldStatus({ status }) {
  if (status == null) return null;
  return <div className="corn-status">{status}</div>;
}
