/**
 * @jest-environment node
 */

describe('CornCopyButton SSR safety', () => {
  test('can load module when document and customElements are unavailable', () => {
    jest.isolateModules(() => {
      expect(() => {
        require('./copy-button.js');
      }).not.toThrow();
    });
  });

  test('can load slider module when customElements is unavailable', () => {
    jest.isolateModules(() => {
      expect(() => {
        require('../sliders/slider.js');
      }).not.toThrow();
    });
  });
});
