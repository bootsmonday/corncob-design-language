/**
 * Renders a link component with the specified class name, underline option, and children.
 * @param {{ ref: React.Ref<any>, as?: React.ElementType, underline?: boolean, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornLink({ ref, as: Component, underline, className, children, ...props }: {
    ref: React.Ref<any>;
    as?: React.ElementType;
    underline?: boolean;
    className?: string;
    children: React.ReactNode;
}): JSX.Element;
/**
 * Renders a link list component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornLinkList({ ref, className, children, ...props }: {
    ref: React.Ref<any>;
    className?: string;
    children: React.ReactNode;
}): JSX.Element;
