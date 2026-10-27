import "./mainLayout.css"
import {type ReactElement} from "react";
import SideBar from "../../../features/sideBar/sideBar.tsx";
import {Outlet, useLoaderData, useNavigate} from "react-router";
import {clearSessionUser} from "../../../shared/auth/session.ts";
import {LOGIN_PATH, type AuthRouteData} from "../../../shared/auth/guards.ts";

export default function MainLayout(): ReactElement {
    const {user} = useLoaderData<AuthRouteData>();
    const navigate = useNavigate();

    const handleLogout = (): void => {
        clearSessionUser();
        navigate(LOGIN_PATH, {replace: true});
    };

    return(
        <section className="main-layout">
            <SideBar name={user.firstName} rule={user.rule} onLogout={handleLogout}/>
            <Outlet/>
        </section>
    )
};
