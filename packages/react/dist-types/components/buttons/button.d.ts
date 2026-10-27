/**
 * Renders a button component with the specified variant, size, icon, type, and children.
 * @param {{ ref: React.Ref<any>, variant?: string, size?: string, icon?: boolean, type?: string, as?: React.ElementType, className?: string, disabled?: boolean, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornButton({ ref, variant, size, icon, type, as: Component, className, disabled, children, ...props }: {
    ref: React.Ref<any>;
    variant?: string;
    size?: string;
    icon?: boolean;
    type?: string;
    as?: React.ElementType;
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
}): JSX.Element;
