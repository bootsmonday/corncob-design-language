import { joinClassNames } from '../utils/class-names.js';

export function resolveFieldLabel(label, children) {
  if (label != null && label !== '') return label;
  if (children != null && children !== '') return children;
  return null;
}

export function fieldItemClassName(statusVariant, itemClassName = '') {
  return joinClassNames(statusVariant && `corn-status--${statusVariant}`, itemClassName);
}

export function FieldStatus({ status }) {
  if (status == null) return null;
  return <div className="corn-status">{status}</div>;
}
