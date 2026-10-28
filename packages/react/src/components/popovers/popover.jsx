import { createContext, useContext, useId } from 'react';
import { joinClassNames } from '../../utils/class-names.js';
import { CornButton } from '../buttons/button.jsx';
import '../../custom-elements.js';

export const CORN_POPOVER_POSITIONS = ['top', 'top-right', 'top-left', 'right', 'right-top', 'right-bottom', 'bottom', 'bottom-right', 'bottom-left', 'left', 'left-top', 'left-bottom'];

const PopoverContext = createContext(null);

/**
 * Renders a popover trigger component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornPopoverTrigger({ ref, children, className = '', ...props }) {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error('CornPopoverTrigger must be used within a CornPopover');
  }

  return (
    <CornButton {...props} ref={ref} id={`${context.id}-trigger`} type={props.type ?? 'button'} className={joinClassNames('corn-pop', className)} aria-controls={`${context.id}-content`}>
      {children}
    </CornButton>
  );
}

/**
 * Renders a popover content component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornPopoverContent({ ref, children, className = '', ...props }) {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error('CornPopoverContent must be used within a CornPopover');
  }

  return (
    <corn-popover {...props} ref={ref} id={`${context.id}-content`} position={context.position} aria-labelledby={`${context.id}-trigger`} className={joinClassNames('corn-popover', className)}>
      {children}
    </corn-popover>
  );
}

/**
 * Renders a popover component with the specified class name, anchor class name, and children.
 * @param {{ ref?: React.Ref<any>, id?: string, position?: string, className?: string, anchorClassName?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export function CornPopover({ ref, id, position = 'top', className = '', anchorClassName = '', children, ...props }) {
  const generatedId = useId();
  const popoverId = id ?? generatedId;

  return (
    <PopoverContext.Provider value={{ id: popoverId, position }}>
      <div {...props} ref={ref} className={joinClassNames('corn-popover--anchor', anchorClassName, className)}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}
