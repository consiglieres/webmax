import type {ReactElement} from "react";
import {Outlet} from "react-router";

export default function AuthorizationLayout(): ReactElement {
    return(
        <>
            <Outlet/>
        </>
    )
}