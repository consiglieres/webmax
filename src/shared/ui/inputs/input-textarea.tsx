import type {ReactElement, TextareaHTMLAttributes} from "react";
import Field from "./field.tsx";

interface InputTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    hint?: string;
    fullWidth?: boolean;
}

function InputTextarea({
    label,
    hint,
    fullWidth = false,
    required,
    className = "",
    ...rest
}: InputTextareaProps): ReactElement {
    return (
        <Field label={label} hint={hint} fullWidth={fullWidth} required={required}>
            <textarea
                className={`field__control field__control--textarea ${className}`.trim()}
                required={required}
                {...rest}
            />
        </Field>
    );
}

export default InputTextarea;
