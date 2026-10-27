import type {ReactElement, ReactNode} from "react";
import Button from "../buttons/button/button.tsx";
import "./form-actions.css";

interface FormActionsProps {
    submitLabel: string;
    onCancel: () => void;
    cancelLabel?: string;
    note?: ReactNode;
}

function FormActions({
    submitLabel,
    onCancel,
    cancelLabel = "Отмена",
    note,
}: FormActionsProps): ReactElement {
    return (
        <footer className="form-actions">
            <p className="form-actions__note">
                {note ?? (<><span>*</span> — обязательные поля</>)}
            </p>
            <div className="form-actions__buttons">
                <Button variant="secondary" onClick={onCancel}>{cancelLabel}</Button>
                <Button type="submit">{submitLabel}</Button>
            </div>
        </footer>
    );
}

export default FormActions;
