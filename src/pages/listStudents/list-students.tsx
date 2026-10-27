import {type ReactElement, useState} from "react";
import {useNavigate} from "react-router";
import "./list-students.css";
import {Button, ListHeader, ListPage, ListToolbar, PageHeader} from "../../shared/ui";
import getStudents from "../../entities/students.ts";

const STUDENT_COLUMNS = ["ФИО", "Курс", "Логин Proxmox", "Пароль", "Стенды"];
const COURSE_OPTIONS = [1, 2, 3, 4];

function getFullName(student: {lastName: string; firstName: string; middleName?: string}): string {
    return [student.lastName, student.firstName, student.middleName]
        .filter(Boolean)
        .join(" ");
}

function ListStudents(): ReactElement {
    const navigate = useNavigate();
    const students = getStudents();
    const [query, setQuery] = useState("");
    const [course, setCourse] = useState("");

    const normalizedQuery = query.trim().toLowerCase();
    const filteredStudents = students.filter((student) => {
        const matchesQuery = !normalizedQuery || [
            getFullName(student),
            student.proxmoxLogin,
            ...student.listStands.map((stand) => stand.name),
        ].some((value) => value.toLowerCase().includes(normalizedQuery));

        const matchesCourse = !course || String(student.course) === course;

        return matchesQuery && matchesCourse;
    });

    return(
        <ListPage className="students">
            <PageHeader
                title="Студенты"
                subtitle="Студенты и закреплённые за ними стенды"
                actions={
                    <Button onClick={() => navigate("/listStudents/form")}>
                        + Добавить группу
                    </Button>
                }
            />

            <ListToolbar
                searchPlaceholder="Поиск по ФИО или логину"
                searchValue={query}
                onSearchChange={(event) => setQuery(event.target.value)}
            >
                <select
                    className="list-toolbar__select"
                    aria-label="Фильтр по курсу"
                    value={course}
                    onChange={(event) => setCourse(event.target.value)}
                >
                    <option value="">Все курсы</option>
                    {COURSE_OPTIONS.map((courseNumber) => (
                        <option key={courseNumber} value={courseNumber}>
                            {courseNumber} курс
                        </option>
                    ))}
                </select>
            </ListToolbar>

            <ListHeader columns={STUDENT_COLUMNS} />

            <section className="students__list">
                {filteredStudents.map((student) => (
                    <article className="students__row" key={student.id}>
                        <p className="students__name">{getFullName(student)}</p>
                        <p>{student.course} курс</p>
                        <p className="students__mono">{student.proxmoxLogin}</p>
                        <p className="students__mono">{student.password}</p>
                        <div className="students__stands">
                            {student.listStands.map((stand) => (
                                <span className="students__stand" key={stand.poolId}>
                                    {stand.name}
                                </span>
                            ))}
                        </div>
                    </article>
                ))}

                {filteredStudents.length === 0 ? (
                    <p className="students__empty">Студенты не найдены.</p>
                ) : null}
            </section>
        </ListPage>
    )
}

export default ListStudents;
