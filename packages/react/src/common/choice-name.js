import { Children, cloneElement, isValidElement } from 'react';

/**
 * Takes React children and assigns a name prop to those of specified types if they don't already have one.
 * @param {React.ReactNode} children
 * @param {string} name
 * @param {Array<React.ElementType>} types
 * @returns {React.ReactNode}
 */
export function withChoiceName(children, name, types) {
  const allowed = new Set(types);

  return Children.map(children, (child) => {
    if (!isValidElement(child) || !allowed.has(child.type)) return child;
    if (child.props.name != null) return child;
    return cloneElement(child, { name });
  });
}
