import '../../custom-elements.js';
/**
 * Renders an expandable component with the specified open state, name, and children.
 * @param {{ ref?: React.Ref<any>, className?: string, open?: boolean, name?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornExpandable({ ref, className, open, name, children, ...props }: {
    ref?: React.Ref<any>;
    className?: string;
    open?: boolean;
    name?: string;
    children: React.ReactNode;
}): JSX.Element;
/**
 * Renders an expandable summary component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornExpandableSummary({ ref, className, children, ...props }: {
    ref?: React.Ref<any>;
    className?: string;
    children: React.ReactNode;
}): JSX.Element;
/**
 * Renders an expandable content component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornExpandableContent({ ref, className, children, ...props }: {
    ref?: React.Ref<any>;
    className?: string;
    children: React.ReactNode;
}): JSX.Element;
/**
 * Renders an accordion component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornAccordion({ ref, className, children, ...props }: {
    ref?: React.Ref<any>;
    className?: string;
    children: React.ReactNode;
}): JSX.Element;
