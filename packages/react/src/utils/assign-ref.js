/**
 * Assigns a reference to a DOM node or component instance.
 * @param {*} ref The reference to assign.
 * @param {*} node The DOM node or component instance.
 * @returns {Function|undefined} A cleanup function if applicable.
 */
export function assignRef(ref, node) {
  if (typeof ref === 'function') {
    const cleanup = ref(node);
    if (typeof cleanup === 'function') {
      return cleanup;
    }

    return () => {
      ref(null);
    };
  }

  if (ref) {
    ref.current = node;
    return () => {
      ref.current = null;
    };
  }
}
