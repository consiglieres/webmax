import type {ReactElement, SelectHTMLAttributes} from "react";
import Field from "./field.tsx";

export interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

interface InputSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
    label: string;
    options: SelectOption[];
    placeholder?: string;
    hint?: string;
    fullWidth?: boolean;
}

function InputSelect({
    label,
    options,
    placeholder,
    hint,
    fullWidth = false,
    required,
    className = "",
    defaultValue,
    value,
    ...rest
}: InputSelectProps): ReactElement {
    const isControlled = value !== undefined;
    const initialValue = defaultValue ?? (placeholder ? "" : options[0]?.value);

    return (
        <Field label={label} hint={hint} fullWidth={fullWidth} required={required}>
            <select
                className={`field__control field__control--select ${className}`.trim()}
                required={required}
                {...(isControlled ? {value} : {defaultValue: initialValue})}
                {...rest}
            >
                {placeholder ? <option value="" disabled>{placeholder}</option> : null}
                {options.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                    </option>
                ))}
            </select>
        </Field>
    );
}

export default InputSelect;
