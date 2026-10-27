import type {ReactElement} from "react";
import {NavLink} from "react-router";
import "./linkSideBar.css";

export default function LinkSideBar(props: any): ReactElement {
    const {
        imageButton,
        buttonName,
        linkURL
    } = props

    return(
        <NavLink
            to={linkURL}
            end={linkURL === "" || linkURL === "/"}
            className={({isActive}) => isActive ? "sidebar-button active" : "sidebar-button"}
        >
            {imageButton ? (
                <span className="sidebar-button__icon">
                    <img src={imageButton} alt=""/>
                </span>
            ) : null}
            <span className="sidebar-button__label">{buttonName}</span>
        </NavLink>
    )
}
