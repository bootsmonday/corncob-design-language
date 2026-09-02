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
