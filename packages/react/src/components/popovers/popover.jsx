import React, { createContext, useId, useContext } from 'react';
import { joinClassNames } from '../../utils/class-names.js';
import { CornButton } from '../buttons/button.jsx';
import '../../../../../src/components/popovers/popover.js';

export const CORN_POPOVER_POSITIONS = ['top', 'top-right', 'top-left', 'right', 'right-top', 'right-bottom', 'bottom', 'bottom-right', 'bottom-left', 'left', 'left-top', 'left-bottom'];

export const CornPopoverTrigger = ({ children, className = '', ...props }) => {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error('CornPopoverTrigger must be used within a CornPopover');
  }

  return (
    <CornButton {...props} id={`${context.id}-trigger`} type={props.type ?? 'button'} className={joinClassNames('corn-pop', className)} aria-controls={`${context.id}-content`}>
      {children}
    </CornButton>
  );
};

export const CornPopoverContent = ({ children, className = '', ...props }) => {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error('CornPopoverContent must be used within a CornPopover');
  }

  return (
    <corn-popover {...props} id={`${context.id}-content`} position={context.position} aria-labelledby={`${context.id}-trigger`} className={joinClassNames('corn-popover', className)}>
      {children}
    </corn-popover>
  );
};

const PopoverContext = createContext(null);

export const CornPopover = ({ id, position = 'top', className = '', anchorClassName = '', children, ...props }) => {
  const generatedId = useId();
  const popoverId = id ?? generatedId;

  return (
    <PopoverContext.Provider value={{ id: popoverId, position }}>
      <div {...props} className={joinClassNames('corn-popover--anchor', anchorClassName)}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
};
