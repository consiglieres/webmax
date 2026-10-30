import {type ReactElement, useState} from "react";
import {useNavigate} from "react-router";
import "./list-samples.css";
import {Button, ListHeader, ListPage, ListToolbar, PageHeader} from "../../shared/ui";
import getConfigurations from "../../entities/configurations.ts";

const CONFIGURATION_COLUMNS = ["Название", "Описание", "Стендов", "Дата создания"];

function formatDate(value: string): string {
    const [year, month, day] = value.split("-");
    return `${day}.${month}.${year}`;
}

function ListSamples(): ReactElement {
    const navigate = useNavigate();
    const configurations = getConfigurations();
    const [query, setQuery] = useState("");

    const normalizedQuery = query.trim().toLowerCase();
    const filteredConfigurations = configurations.filter((configuration) => {
        return !normalizedQuery ||
            configuration.name.toLowerCase().includes(normalizedQuery) ||
            configuration.description.toLowerCase().includes(normalizedQuery);
    });

    return(
        <ListPage className="samples">
            <PageHeader
                title="Конфигурации золотых стендов"
                subtitle="Шаблоны для создания и развертывания стендов"
                actions={
                    <Button onClick={() => navigate("/listSamples/form")}>
                        + Создать конфигурацию
                    </Button>
                }
            />

            <ListToolbar
                searchPlaceholder="Поиск по названию или описанию"
                searchValue={query}
                onSearchChange={(event) => setQuery(event.target.value)}
            />

            <ListHeader columns={CONFIGURATION_COLUMNS} />

            <section className="samples__list">
                {filteredConfigurations.map((configuration) => (
<article className="samples__row" key={configuration.id} onClick={() => navigate(`/listSamples/${configuration.id}`)}>
    <p className="samples__name">{configuration.name}</p>
                        <p className="samples__description">{configuration.description}</p>
                        <p>{configuration.standsCount}</p>
                        <p>{formatDate(configuration.createdAt)}</p>
                    </article>
                ))}

                {filteredConfigurations.length === 0 ? (
                    <p className="samples__empty">Конфигурации не найдены.</p>
                ) : null}
            </section>
        </ListPage>
    )
}

export default ListSamples;
