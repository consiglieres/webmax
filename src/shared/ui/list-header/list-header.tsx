import type {ChangeEventHandler, ReactElement} from "react";
import "./list-header.css";

interface ListHeaderProps {
    columns: string[];
    className?: string;
    selectable?: boolean;
    checked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

function ListHeader({
    columns,
    className = "",
    selectable = false,
    checked,
    onChange,
}: ListHeaderProps): ReactElement {
    return (
        <section className={`list-header ${className}`.trim()}>
            {selectable ? (
                <input
                    className="list-header__checkbox"
                    type="checkbox"
                    aria-label="Выбрать все"
                    checked={checked}
                    onChange={onChange}
                />
            ) : null}
            {columns.map((column, index) => (
                <p key={`${column}-${index}`}>{column}</p>
            ))}
        </section>
    );
}

export default ListHeader;
