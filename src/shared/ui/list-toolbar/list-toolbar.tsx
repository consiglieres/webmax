import type {ChangeEventHandler, FormEventHandler, ReactElement, ReactNode} from "react";
import "./list-toolbar.css";

interface ListToolbarProps {
    searchPlaceholder?: string;
    searchValue?: string;
    onSearchChange?: ChangeEventHandler<HTMLInputElement>;
    onSubmit?: FormEventHandler<HTMLFormElement>;
    children?: ReactNode;
}

function ListToolbar({
    searchPlaceholder = "Поиск по...",
    searchValue,
    onSearchChange,
    onSubmit,
    children,
}: ListToolbarProps): ReactElement {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        onSubmit?.(event);
    };

    const hasFilter = Boolean(children);

    return (
        <form
            className={`list-toolbar${hasFilter ? "" : " list-toolbar--search-only"}`}
            role="search"
            onSubmit={handleSubmit}
        >
            <input
                className="list-toolbar__search"
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={onSearchChange}
                aria-label="Поиск"
            />
            {hasFilter ? children : null}
        </form>
    );
}

export default ListToolbar;
