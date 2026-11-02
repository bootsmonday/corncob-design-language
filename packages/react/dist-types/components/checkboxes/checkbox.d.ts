/**
 * Renders a checkbox component with the specified size, task style, indeterminate state, and other input properties.
 * @param {{ ref?: React.Ref<any>, size?: string, task?: boolean, indeterminate?: boolean, id?: string, name?: string, label?: React.ReactNode, className?: string, checked?: boolean, defaultChecked?: boolean, onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void, value?: string, children?: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornCheckbox({ ref, size, task, indeterminate, id, name, label, className, checked, defaultChecked, onChange, value, children, ...inputProps }: {
    ref?: React.Ref<any>;
    size?: string;
    task?: boolean;
    indeterminate?: boolean;
    id?: string;
    name?: string;
    label?: React.ReactNode;
    className?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    children?: React.ReactNode;
}): JSX.Element;
