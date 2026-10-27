import type {FormEventHandler, ReactElement, ReactNode} from "react";
import "./form-page.css";

interface FormPageProps {
    header: ReactNode;
    onSubmit: FormEventHandler<HTMLFormElement>;
    children: ReactNode;
}

function FormPage({header, onSubmit, children}: FormPageProps): ReactElement {
    return (
        <section className="form-page">
            {header}
            <form className="record-form" onSubmit={onSubmit}>
                {children}
            </form>
        </section>
    );
}

export default FormPage;
