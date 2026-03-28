import { createElement } from 'react';

function buildButtonClasses({ variant = 'primary', size = 'md', className = '' } = {}) {
  const classes = ['corn-button'];

  if (variant && variant !== 'primary') {
    classes.push(`corn-button--${variant}`);
  }

  if (size && size !== 'md') {
    classes.push(`corn-button--${size}`);
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
}

export function CcButton({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  return createElement(
    'button',
    {
      ...props,
      className: buildButtonClasses({ variant, size, className }),
    },
    children
  );
}

export { buildButtonClasses };
