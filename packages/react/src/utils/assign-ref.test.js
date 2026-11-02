import { assignRef } from './assign-ref.js';

describe('assignRef', () => {
  test('sets and clears an object ref', () => {
    const ref = { current: null };
    const cleanup = assignRef(ref, 'node');

    expect(ref.current).toBe('node');
    cleanup();
    expect(ref.current).toBeNull();
  });

  test('calls a function ref and the cleanup it returns', () => {
    const cleanups = [];
    const ref = jest.fn(() => () => cleanups.push('clean'));
    const cleanup = assignRef(ref, 'node');

    expect(ref).toHaveBeenCalledWith('node');
    cleanup();
    expect(cleanups).toEqual(['clean']);
  });

  test('clears a function ref that returns no cleanup', () => {
    const ref = jest.fn();
    const cleanup = assignRef(ref, 'node');

    cleanup();
    expect(ref).toHaveBeenLastCalledWith(null);
  });

  test('ignores an empty ref', () => {
    expect(assignRef(null, 'node')).toBeUndefined();
    expect(assignRef(undefined, 'node')).toBeUndefined();
  });
});
