import { Children, cloneElement, isValidElement } from 'react';

export function withChoiceName(children, name, types) {
  const allowed = new Set(types);

  return Children.map(children, (child) => {
    if (!isValidElement(child) || !allowed.has(child.type)) return child;
    if (child.props.name != null) return child;
    return cloneElement(child, { name });
  });
}
