import type {ReactElement, ReactNode} from "react";
import "./field.css";

interface FieldProps {
    label: string;
    required?: boolean;
    hint?: string;
    fullWidth?: boolean;
    children: ReactNode;
}

function Field({label, required, hint, fullWidth = false, children}: FieldProps): ReactElement {
    return (
        <label className={`field${fullWidth ? " field--full" : ""}`}>
            <span className="field__label">
                {label}
                {required ? <span className="field__required" aria-hidden="true">*</span> : null}
            </span>
            {children}
            {hint ? <span className="field__hint">{hint}</span> : null}
        </label>
    );
}

export default Field;
