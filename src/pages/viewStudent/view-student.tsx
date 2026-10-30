import {type ReactElement} from "react";
import {useParams} from "react-router";
import "./view-student.css";
import {PageHeader} from "../../shared/ui";
import getStudents from "../../entities/students.ts";

function getFullName(student: {lastName: string; firstName: string; middleName?: string}): string {
    return [student.lastName, student.firstName, student.middleName]
        .filter(Boolean)
        .join(" ");
}

function ViewStudent(): ReactElement {
    const {id} = useParams();
    const student = getStudents().find((item) => String(item.id) === String(id)) ?? getStudents()[0];

    return (
        <section className="view-student">
            <PageHeader
                backTo="/listStudents"
                backLabel="К списку студентов"
                title={getFullName(student)}
                subtitle={`Студент · ${student.course} курс`}
                badge="Просмотр"
            />

            <div className="view-student__card">
                <dl className="view-student__list">
                    <div className="view-student__row">
                        <dt>ФИО</dt>
                        <dd>{getFullName(student)}</dd>
                    </div>
                    <div className="view-student__row">
                        <dt>Курс</dt>
                        <dd>{student.course}</dd>
                    </div>
                    <div className="view-student__row">
                        <dt>Логин Proxmox</dt>
                        <dd className="view-student__mono">{student.proxmoxLogin}</dd>
                    </div>
                    <div className="view-student__row">
                        <dt>Пароль</dt>
                        <dd className="view-student__mono">{student.password}</dd>
                    </div>
                    <div className="view-student__row">
                        <dt>Стенды</dt>
                        <dd>
                            <div className="view-student__stands">
                                {student.listStands.map((stand) => (
                                    <span className="view-student__stand" key={stand.poolId}>
                                        {stand.name}
                                    </span>
                                ))}
                            </div>
                        </dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}

export default ViewStudent;
