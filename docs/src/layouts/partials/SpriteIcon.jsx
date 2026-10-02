import React from 'react';
import bootstrapIconsSprite from 'bootstrap-icons/bootstrap-icons.svg?url';

export default function SpriteIcon({ name, className = '', size = 24, ...props }) {
  return (
    <svg className={`${className}`} width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      {/* Path points to the public asset folder + the specific symbol ID */}
      <use href={`${bootstrapIconsSprite}#${name}`} />
    </svg>
  );
}
