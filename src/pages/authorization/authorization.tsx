import "./authorization.css"
import {type ChangeEvent, type FormEvent, type ReactElement, useState} from "react";
import type {IUserAuthorization} from "../../entities/interfaces/user.interface.ts";
import getUser from "../../entities/authorization.ts";
import {useNavigate, useSearchParams} from "react-router";
import {saveSessionUser} from "../../shared/auth/session.ts";
import {getRedirectPath} from "../../shared/auth/guards.ts";
import {Button} from "../../shared/ui";


const LOGO_SRC: string = "";

function Authorization(): ReactElement {
    const [formData, setFormData] = useState<IUserAuthorization>({
        login: "",
        password: ""
    })
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        setError(null);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const user = getUser(formData);

        if (!user) {
            setError("Введите логин и пароль");
            return;
        }

        saveSessionUser(user);
        navigate(getRedirectPath(searchParams.get("from")), {replace: true});
    }

    const isSubmitDisabled = !formData.login.trim() || !formData.password.trim();

    return(
        <section className="authorization">
            {LOGO_SRC ? <img src={LOGO_SRC} alt="urfu_logo"/> : null}
            <section className="card">
                <h4 className="card__logo">Webmo<b className="latter">X</b></h4>
                <form className="form" onSubmit={handleSubmit}>
                    <input className="form__input login"
                           type="text"
                           placeholder="Логин"
                           name="login"
                           autoComplete="username"
                           value={formData.login}
                           onChange={handleChange}
                    />
                    <input className="form__input password"
                           type="password"
                           placeholder="Пароль"
                           name="password"
                           autoComplete="current-password"
                           value={formData.password}
                           onChange={handleChange}
                    />
                    {error && <p className="form__error" role="alert">{error}</p>}
                    <Button
                        className="authorization__submit"
                        type="submit"
                        size="lg"
                        fullWidth
                        disabled={isSubmitDisabled}
                    >
                        Войти
                    </Button>
                </form>
            </section>
        </section>
    )
}

export default Authorization;
