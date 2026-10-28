import '../../custom-elements.js';
export declare const CORN_SELECT_SIZES: string[];
/**
 * Renders a select option component with the specified ref, value, and children.
 * @param {*} param0 The props for the CornSelectOption component.
 * @returns {JSX.Element} The rendered CornSelectOption component.
 */
export declare function CornSelectOption({ ref, value, children, ...props }: any): JSX.Element;
/**
 * Renders a select component with the specified ref, id, class name, size, label, name, placeholder, multiple state, required state, disabled state, value, status, status variant, item class name, and children.
 * @param {*} param0 The props for the CornSelect component.
 * @returns {JSX.Element} The rendered CornSelect component.
 */
export declare function CornSelect({ ref, id, className, size, label, name, placeholder, multiple, required, disabled, value, status, statusVariant, itemClassName, children, ...props }: any): JSX.Element;
