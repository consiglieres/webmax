import {type ChangeEvent, type FormEvent, type ReactElement, useState} from "react";
import {useNavigate} from "react-router";
import {
    Field,
    FormActions,
    FormPage,
    FormSection,
    InputCombobox,
    InputFile,
    InputText,
    PageHeader,
} from "../../../shared/ui";
import {mockTeachers} from "../../../mocks/teachers.ts";
import {type CsvStudent, parseStudentCsv} from "./csv.ts";
import "./form-student.css";

function getFullName(student: CsvStudent): string {
    return [student.lastName, student.firstName, student.middleName]
        .filter(Boolean)
        .join(" ");
}

function FormStudentGroup(): ReactElement {
    const navigate = useNavigate();
    const teacherOptions = mockTeachers.map((teacher) => ({
        value: String(teacher.id),
        label: teacher.fullName,
    }));

    const [teacherName, setTeacherName] = useState("");
    const [csvStudents, setCsvStudents] = useState<CsvStudent[]>([]);
    const [csvFileName, setCsvFileName] = useState("");
    const [csvError, setCsvError] = useState<string | null>(null);

    const normalizedTeacherName = teacherName.trim().toLowerCase();
    const hasTeacherMatch = teacherOptions.some((option) =>
        option.label.toLowerCase().includes(normalizedTeacherName)
    );
    const teacherHint = normalizedTeacherName && !hasTeacherMatch
        ? "Совпадений в списке нет — ФИО будет сохранено так, как вы его ввели."
        : "Начните вводить ФИО — подходящие преподаватели появятся в списке. Если преподавателя нет, введите ФИО полностью.";

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        const file = event.target.files?.[0];

        setCsvStudents([]);
        setCsvFileName("");
        setCsvError(null);

        if (!file) {
            return;
        }

        if (!file.name.toLowerCase().endsWith(".csv")) {
            setCsvError("Выберите файл в формате .csv.");
            event.target.value = "";
            return;
        }

        try {
            const fileContent = await file.text();
            const result = parseStudentCsv(fileContent);

            if (result.error) {
                setCsvError(result.error);
                event.target.value = "";
                return;
            }

            setCsvStudents(result.students);
            setCsvFileName(file.name);
        } catch {
            setCsvError("Не удалось прочитать CSV-файл.");
            event.target.value = "";
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (csvStudents.length === 0) {
            setCsvError("Загрузите корректный CSV-файл со студентами.");
            return;
        }

        navigate("/listStudents");
    };

    return(
        <FormPage
            header={
                <PageHeader
                    backTo="/listStudents"
                    backLabel="К списку студентов"
                    title="Новая группа студентов"
                    subtitle="Загрузите студентов из CSV-файла и закрепите за группой преподавателя."
                    badge="Новая группа"
                    size="lg"
                />
            }
            onSubmit={handleSubmit}
        >
            <FormSection
                step="01"
                title="Группа"
                description="Название группы, студенты которой загружаются из CSV-файла"
            >
                <InputText
                    label="Название группы"
                    name="groupName"
                    placeholder="РИ-220901"
                    hint="Курс группы определяется из CSV-файла."
                    fullWidth
                    required
                />
            </FormSection>

            <FormSection
                step="02"
                title="Студенты"
                description="CSV-файл со списком студентов группы"
            >
                <Field
                    label="CSV-файл со студентами"
                    hint="Колонки: Фамилия, Имя, Отчество (или одна колонка ФИО), Курс, Логин Proxmox, Пароль. Разделитель — запятая или точка с запятой."
                    fullWidth
                    required
                >
                    <InputFile
                        name="studentsCsv"
                        accept=".csv,text/csv"
                        aria-label="CSV-файл со студентами"
                        required
                        onChange={handleFileChange}
                    />
                </Field>

                {csvError ? (
                    <p className="csv-preview__error" role="alert">{csvError}</p>
                ) : null}

                {csvStudents.length > 0 ? (
                    <div className="csv-preview">
                        <div className="csv-preview__header">
                            <p className="csv-preview__title">
                                Найдено студентов: <strong>{csvStudents.length}</strong>
                            </p>
                            <p className="csv-preview__file">{csvFileName}</p>
                        </div>

                        <div className="csv-preview__row csv-preview__row--head">
                            <span>ФИО</span>
                            <span>Курс</span>
                            <span>Логин Proxmox</span>
                        </div>

                        {csvStudents.slice(0, 5).map((student, index) => (
                            <div className="csv-preview__row" key={`${student.proxmoxLogin}-${index}`}>
                                <span>{getFullName(student)}</span>
                                <span>{student.course || "—"}</span>
                                <span>{student.proxmoxLogin || "—"}</span>
                            </div>
                        ))}

                        {csvStudents.length > 5 ? (
                            <p className="csv-preview__more">
                                И ещё {csvStudents.length - 5}…
                            </p>
                        ) : null}
                    </div>
                ) : null}
            </FormSection>

            <FormSection
                step="03"
                title="Преподаватель"
                description="ФИО преподавателя, закреплённого за группой"
            >
                <InputCombobox
                    label="ФИО преподавателя"
                    name="teacherName"
                    value={teacherName}
                    options={teacherOptions}
                    onChange={setTeacherName}
                    placeholder="Начните вводить ФИО"
                    hint={teacherHint}
                    fullWidth
                    required
                />
            </FormSection>

            <FormActions
                submitLabel="Добавить группу"
                onCancel={() => navigate("/listStudents")}
            />
        </FormPage>
    )
}

export default FormStudentGroup;
