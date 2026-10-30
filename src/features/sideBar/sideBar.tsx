import type {ReactElement} from "react";
import {Button, LinkSideBar} from "../../shared/ui";
import "./sideBar.css";

interface SideBarProps {
    name: string;
    rule: string;
    onLogout: () => void;
}

function SideBar({name, rule, onLogout}: SideBarProps): ReactElement {
    return(
        <section className="sideBar">
            <h1>Webmo<b className="latter">X</b></h1>
            <section className="top">
                <LinkSideBar linkURL="/" imageButton="" buttonName="Главная"/>
                <LinkSideBar linkURL="listStudents" imageButton="" buttonName="Студенты"/>
                <LinkSideBar linkURL="listSamples" imageButton="" buttonName="Конфигурации"/>
            </section>
            <section className="bottom">
                <div className="bottom__profile">
                    <img src="" alt=""/>
                    <div className="profile">
                        <p className="profile__name">{name}</p>
                        <p className="profile__rule">{rule}</p>
                    </div>
                </div>
                <div className="bottom__exit">
                    <Button variant="danger" fullWidth onClick={onLogout}>
                        Выйти
                    </Button>
                </div>
            </section>
        </section>
    )
}

export default SideBar;
