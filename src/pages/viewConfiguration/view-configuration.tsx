import {type ReactElement} from "react";
import {useParams} from "react-router";
import "./view-configuration.css";
import {PageHeader} from "../../shared/ui";
import getConfigurations from "../../entities/configurations.ts";

function formatDate(value: string): string {
    const [year, month, day] = value.split("-");
    return `${day}.${month}.${year}`;
}

function ViewConfiguration(): ReactElement {
    const {id} = useParams();
    const configuration = getConfigurations().find((item) => String(item.id) === String(id)) ?? getConfigurations()[0];

    return (
        <section className="view-configuration">
            <PageHeader
                backTo="/listSamples"
                backLabel="К списку конфигураций"
                title={configuration.name}
                subtitle={configuration.description}
                badge="Просмотр"
            />

            <div className="view-configuration__card">
                <dl className="view-configuration__list">
                    <div className="view-configuration__row">
                        <dt>Название</dt>
                        <dd>{configuration.name}</dd>
                    </div>
                    <div className="view-configuration__row">
                        <dt>Описание</dt>
                        <dd>{configuration.description}</dd>
                    </div>
                    <div className="view-configuration__row">
                        <dt>Стендов</dt>
                        <dd>{configuration.standsCount}</dd>
                    </div>
                    <div className="view-configuration__row">
                        <dt>Дата создания</dt>
                        <dd>{formatDate(configuration.createdAt)}</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}

export default ViewConfiguration;
