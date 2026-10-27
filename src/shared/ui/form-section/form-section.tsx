import type {ReactElement, ReactNode} from "react";
import "./form-section.css";

interface FormSectionProps {
    step: string;
    title: string;
    description?: string;
    columns?: 2 | 3;
    children: ReactNode;
}

function FormSection({
    step,
    title,
    description,
    columns = 2,
    children,
}: FormSectionProps): ReactElement {
    const gridClassName = `form-grid${columns === 3 ? " form-grid--three" : ""}`;

    return (
        <section className="form-card">
            <header className="form-card__header">
                <div className="form-card__info">
                    <h2 className="form-card__title">{title}</h2>
                    {description ? <p className="form-card__description">{description}</p> : null}
                </div>
                <span className="form-card__step" aria-hidden="true">{step}</span>
            </header>

            <div className={gridClassName}>
                {children}
            </div>
        </section>
    );
}

export default FormSection;
