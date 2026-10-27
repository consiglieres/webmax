import {type FormEvent, type ReactElement, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";
import {
    FormActions,
    FormPage,
    FormSection,
    InputSelect,
    PageHeader,
} from "../../../shared/ui";
import getConfigurations from "../../../entities/configurations.ts";
import {mockGroups} from "../../../mocks/groups.ts";

const CREATED_CONFIGURATION_VALUE = "created";

function FormAssignment(): ReactElement {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const configurations = getConfigurations();
    const groups = mockGroups;
    const [groupId, setGroupId] = useState("");

    const requestedConfiguration = searchParams.get("configuration")?.trim() ?? "";
    const matchingConfiguration = configurations.find(
        (configuration) => configuration.name === requestedConfiguration
    );
    const configurationOptions = configurations.map((configuration) => ({
        value: String(configuration.id),
        label: configuration.name,
    }));

    if (requestedConfiguration && !matchingConfiguration) {
        configurationOptions.unshift({
            value: CREATED_CONFIGURATION_VALUE,
            label: `${requestedConfiguration} (новая)`,
        });
    }

    const defaultConfiguration = matchingConfiguration
        ? String(matchingConfiguration.id)
        : requestedConfiguration
            ? CREATED_CONFIGURATION_VALUE
            : undefined;

    const groupOptions = groups.map((group) => ({
        value: String(group.id),
        label: `${group.name} · ${group.course} курс · ${group.teacherName}`,
    }));
    const selectedGroup = groups.find((group) => String(group.id) === groupId);

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        navigate("/listSamples");
    };

    return(
        <FormPage
            header={
                <PageHeader
                    backTo="/listSamples"
                    backLabel="К списку конфигураций"
                    title="Назначение конфигурации"
                    subtitle="Выберите конфигурацию и группу — конфигурация будет закреплена за всеми студентами группы."
                    badge="После создания"
                    size="lg"
                />
            }
            onSubmit={handleSubmit}
        >
            <FormSection
                step="01"
                title="Конфигурация и группа"
                description={requestedConfiguration
                    ? `Конфигурация «${requestedConfiguration}» создана. Осталось выбрать группу.`
                    : "Свяжите готовую конфигурацию с учебной группой"}
            >
                <InputSelect
                    label="Конфигурация"
                    name="configurationId"
                    placeholder="Выберите конфигурацию"
                    options={configurationOptions}
                    defaultValue={defaultConfiguration}
                    required
                />
                <InputSelect
                    label="Группа"
                    name="groupId"
                    placeholder="Выберите группу"
                    options={groupOptions}
                    value={groupId}
                    onChange={(event) => setGroupId(event.target.value)}
                    hint={selectedGroup
                        ? `Студентов: ${selectedGroup.studentsCount} · Преподаватель: ${selectedGroup.teacherName}`
                        : "В списке — группы, добавленные через CSV-файл."}
                    required
                />
            </FormSection>

            <FormActions
                submitLabel="Назначить конфигурацию"
                onCancel={() => navigate("/listSamples")}
            />
        </FormPage>
    )
}

export default FormAssignment;
