require('@testing-library/jest-dom');

if (!HTMLElement.prototype.attachInternals) {
  Object.defineProperty(HTMLElement.prototype, 'attachInternals', {
    configurable: true,
    value() {
      return {};
    },
  });
}
