export declare const CORN_TOGGLE_SIZES: string[];
/**
 * Renders a toggle component with the specified ref, id, name, label, class name, checked state, default checked state, disabled state, change handler, value, and children.
 * @param {*} param0 The props for the CornToggle component.
 * @returns {JSX.Element} The rendered CornToggle component.
 */
export declare function CornToggle({ ref, id, name, label, className, checked, defaultChecked, disabled, onChange, value, children, ...inputProps }: any): JSX.Element;
/**
 * Renders a toggle group component with the specified ref, legend, name, size, class name, toggles class name, and children.
 * @param {*} param0 The props for the CornToggleGroup component.
 * @returns {JSX.Element} The rendered CornToggleGroup component.
 */
export declare function CornToggleGroup({ ref, legend, name, size, className, togglesClassName, children, ...props }: any): JSX.Element;
