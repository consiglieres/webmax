import {type FormEvent, type ReactElement, useState} from "react";
import {useNavigate} from "react-router";
import {
    FormActions,
    FormPage,
    FormSection,
    InputSelect,
    InputText,
    InputTextarea,
    PageHeader,
} from "../../../shared/ui";
import {mockStands} from "../../../mocks/stands.ts";

function FormConfiguration(): ReactElement {
    const navigate = useNavigate();
    const stands = mockStands;
    const [standId, setStandId] = useState("");
    const [interfaceId, setInterfaceId] = useState("");

    const selectedStand = stands.find((stand) => String(stand.poolId) === standId);
    const standOptions = stands.map((stand) => ({
        value: String(stand.poolId),
        label: `${stand.name} · pool ${stand.poolId}`,
    }));
    const interfaceOptions = (selectedStand?.interfaces ?? []).map((networkInterface) => ({
        value: networkInterface.id,
        label: `${networkInterface.name} — ${networkInterface.type} · ${networkInterface.address}`,
    }));

    const handleStandChange = (value: string): void => {
        setStandId(value);
        setInterfaceId("");
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const configurationName = String(formData.get("name") ?? "").trim();
        const assignmentUrl = configurationName
            ? `/listSamples/assign?configuration=${encodeURIComponent(configurationName)}`
            : "/listSamples/assign";

        navigate(assignmentUrl);
    };

    return(
        <FormPage
            header={
                <PageHeader
                    backTo="/listSamples"
                    backLabel="К списку конфигураций"
                    title="Новая конфигурация"
                    subtitle="Выберите стенд и интерфейс, которые нужно изменить, — затем назначьте конфигурацию группе."
                    badge="Шаблон стенда"
                    size="lg"
                />
            }
            onSubmit={handleSubmit}
        >
            <FormSection
                step="01"
                title="Основная информация"
                description="Название и назначение конфигурации"
            >
                <InputText
                    label="Название"
                    name="name"
                    placeholder="Frontend: React + TypeScript"
                    fullWidth
                    required
                />
                <InputTextarea
                    label="Описание"
                    name="description"
                    placeholder="Для каких практик подходит стенд и что в него входит"
                    fullWidth
                />
            </FormSection>

            <FormSection
                step="02"
                title="Стенд и интерфейс"
                description="Стенд, в конфигурации которого нужно изменить интерфейс"
            >
                <InputSelect
                    label="Стенд"
                    name="standId"
                    placeholder="Выберите стенд"
                    options={standOptions}
                    value={standId}
                    onChange={(event) => handleStandChange(event.target.value)}
                    hint={selectedStand?.description}
                    required
                />
                <InputSelect
                    label="Интерфейс для изменения"
                    name="interfaceId"
                    placeholder={selectedStand ? "Выберите интерфейс" : "Сначала выберите стенд"}
                    options={interfaceOptions}
                    value={interfaceId}
                    onChange={(event) => setInterfaceId(event.target.value)}
                    hint={selectedStand
                        ? "Будут изменены параметры выбранного сетевого интерфейса."
                        : "Список интерфейсов появится после выбора стенда."}
                    disabled={!selectedStand}
                    required
                />
            </FormSection>

            <FormActions
                submitLabel="Создать конфигурацию"
                onCancel={() => navigate("/listSamples")}
            />
        </FormPage>
    )
}

export default FormConfiguration;
