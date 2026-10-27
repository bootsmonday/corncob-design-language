import '../../custom-elements.js';
export declare const CORN_POPOVER_POSITIONS: string[];
/**
 * Renders a popover trigger component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornPopoverTrigger({ ref, children, className, ...props }: {
    ref: React.Ref<any>;
    className?: string;
    children: React.ReactNode;
}): JSX.Element;
/**
 * Renders a popover content component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornPopoverContent({ ref, children, className, ...props }: {
    ref: React.Ref<any>;
    className?: string;
    children: React.ReactNode;
}): JSX.Element;
/**
 * Renders a popover component with the specified class name, anchor class name, and children.
 * @param {{ ref: React.Ref<any>, id?: string, position?: string, className?: string, anchorClassName?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornPopover({ ref, id, position, className, anchorClassName, children, ...props }: {
    ref: React.Ref<any>;
    id?: string;
    position?: string;
    className?: string;
    anchorClassName?: string;
    children: React.ReactNode;
}): JSX.Element;
