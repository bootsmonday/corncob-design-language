import { joinClassNames } from '../../utils/class-names.js';
import '../../../../../src/components/popovers/popover.js';

export const CORN_POPOVER_POSITIONS = ['top', 'top-right', 'top-left', 'right', 'right-top', 'right-bottom', 'bottom', 'bottom-right', 'bottom-left', 'left', 'left-top', 'left-bottom'];

export function CornPopover({ id, position = 'top', triggerText, triggerClassName = '', className = '', anchorClassName = '', children, buttonProps, ...props }) {
  if (!id) {
    throw new Error('CornPopover requires an "id" prop.');
  }

  const resolvedButtonProps = buttonProps ?? {};
  const triggerClasses = joinClassNames('corn-button', 'corn-pop', triggerClassName);
  const popoverClasses = joinClassNames('corn-popover', className);
  const anchorClasses = joinClassNames('corn-popover--anchor', anchorClassName);

  return (
    <div className={anchorClasses}>
      {triggerText != null ? (
        <button {...resolvedButtonProps} type={resolvedButtonProps.type ?? 'button'} className={triggerClasses} aria-controls={id}>
          {triggerText}
        </button>
      ) : null}
      <corn-popover {...props} id={id} position={position} className={popoverClasses}>
        {children}
      </corn-popover>
    </div>
  );
}
