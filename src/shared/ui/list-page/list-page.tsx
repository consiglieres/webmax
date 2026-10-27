import type {ReactElement, ReactNode} from "react";
import "./list-page.css";

interface ListPageProps {
    children: ReactNode;
    className?: string;
}

function ListPage({children, className = ""}: ListPageProps): ReactElement {
    return (
        <section className={`list-page ${className}`.trim()}>
            {children}
        </section>
    );
}

export default ListPage;
