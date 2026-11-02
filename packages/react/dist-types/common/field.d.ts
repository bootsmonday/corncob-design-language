/**
 * Resolves the label for a field based on the provided label and children.
 * @param {string} label
 * @param {React.ReactNode} children
 * @returns {string|null}
 */
export declare function resolveFieldLabel(label: string, children: React.ReactNode): string | null;
/**
 * Returns the class name for a field item based on the status variant and additional class names.
 * @param {string} statusVariant
 * @param {string} itemClassName
 * @returns {string}
 */
export declare function fieldItemClassName(statusVariant: string, itemClassName?: string): string;
/**
 * Returns the status element for a field if the status is provided.
 * @param {{ status: string }} param0
 * @returns {JSX.Element|null}
 */
export declare function FieldStatus({ status }: {
    status: string;
}): JSX.Element | null;
