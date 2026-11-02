/**
 * Renders a radio button component with the specified size, id, name, label, class name, checked state, default checked state, change handler, value, and children.
 * @param {{ ref?: React.Ref<any>, size?: string, id?: string, name: string, label?: string, className?: string, checked?: boolean, defaultChecked?: boolean, onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void, value?: string, children: React.ReactNode }} param0
 * @returns {JSX.Element}
 */
export declare function CornRadioButton({ ref, size, id, name, label, className, checked, defaultChecked, onChange, value, children, ...inputProps }: {
    ref?: React.Ref<any>;
    size?: string;
    id?: string;
    name: string;
    label?: string;
    className?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    children: React.ReactNode;
}): JSX.Element;
