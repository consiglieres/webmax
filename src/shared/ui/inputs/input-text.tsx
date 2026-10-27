import type {InputHTMLAttributes, ReactElement} from "react";
import Field from "./field.tsx";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    hint?: string;
    fullWidth?: boolean;
}

function InputText({
    label,
    hint,
    fullWidth = false,
    required,
    className = "",
    type = "text",
    ...rest
}: InputTextProps): ReactElement {
    return (
        <Field label={label} hint={hint} fullWidth={fullWidth} required={required}>
            <input
                className={`field__control ${className}`.trim()}
                type={type}
                required={required}
                {...rest}
            />
        </Field>
    );
}

export default InputText;
