/**
 * Renders a panel menu component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, as?: React.ElementType, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornPanelMenu({ ref, as: Component, className, children, ...props }: {
    ref?: React.Ref<any>;
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
}): JSX.Element;
/**
 * Renders a panel menu item component with the specified class name, active state, and children.
 * @param {{ ref?: React.Ref<any>, as?: React.ElementType, active?: boolean, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornPanelMenuItem({ ref, as: Component, active, className, children, ...props }: {
    ref?: React.Ref<any>;
    as?: React.ElementType;
    active?: boolean;
    className?: string;
    children: React.ReactNode;
}): JSX.Element;
/**
 * Renders a panel menu submenu component with the specified class name and children.
 * @param {{ ref?: React.Ref<any>, className?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornPanelMenuSubmenu({ ref, className, children, ...props }: {
    ref?: React.Ref<any>;
    className?: string;
    children: React.ReactNode;
}): JSX.Element;
