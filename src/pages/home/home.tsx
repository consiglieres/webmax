import {type ReactElement} from "react";
import {Link} from "react-router";
import "./home.css";
import getStudents from "../../entities/students.ts";
import getConfigurations from "../../entities/configurations.ts";

function Home(): ReactElement {
    const studentsCount = getStudents().length;
    const configurationsCount = getConfigurations().length;

    return (
        <section className="home">
            <div className="home__cards">
                <Link to="/listStudents" className="home__card">
                    <span className="home__card-label">Студенты</span>
                    <span className="home__card-value">{studentsCount}</span>
                    <span className="home__card-hint">Перейти к списку</span>
                </Link>

                <Link to="/listSamples" className="home__card">
                    <span className="home__card-label">Конфигурации</span>
                    <span className="home__card-value">{configurationsCount}</span>
                    <span className="home__card-hint">Перейти к списку</span>
                </Link>
            </div>
        </section>
    );
}

export default Home;
