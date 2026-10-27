/**
 * Renders a message component with the specified variant, class name, and children.
 * @param {{ ref: React.Ref<any>, variant?: 'info' | 'success' | 'warning' | 'error', className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornMessage({ ref, variant, className, children, ...props }: {
    ref: React.Ref<any>;
    variant?: 'info' | 'success' | 'warning' | 'error';
    className?: string;
    children: React.ReactNode;
}): JSX.Element;
/**
 * Renders a message status component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornMessageStatus({ ref, className, children, ...props }: {
    ref: React.Ref<any>;
    className?: string;
    children: React.ReactNode;
}): JSX.Element;
/**
 * Renders a message content component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornMessageContent({ ref, className, children, ...props }: {
    ref: React.Ref<any>;
    className?: string;
    children: React.ReactNode;
}): JSX.Element;
/**
 * Renders a message title component with the specified class name and children.
 * @param {{ ref: React.Ref<any>, as?: React.ElementType, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornMessageTitle({ ref, as: Component, className, children, ...props }: {
    ref: React.Ref<any>;
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
}): JSX.Element;
