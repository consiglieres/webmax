import type {ReactElement, ReactNode} from "react";
import {Link} from "react-router";
import "./page-header.css";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
    badge?: string;
    backTo?: string;
    backLabel?: string;
    size?: "md" | "lg";
    className?: string;
}

function PageHeader({
    title,
    subtitle,
    actions,
    badge,
    backTo,
    backLabel = "Назад",
    size = "md",
    className = "",
}: PageHeaderProps): ReactElement {
    return (
        <header className={`page-header page-header--${size} ${className}`.trim()}>
            {backTo ? (
                <Link className="page-header__back" to={backTo}>
                    <span className="page-header__back-icon" aria-hidden="true">←</span>
                    {backLabel}
                </Link>
            ) : null}

            <div className="page-header__row">
                <div className="page-header__text">
                    <h1 className="page-header__title">{title}</h1>
                    {subtitle ? <p className="page-header__subtitle">{subtitle}</p> : null}
                </div>

                {badge || actions ? (
                    <div className="page-header__aside">
                        {badge ? <span className="page-header__badge">{badge}</span> : null}
                        {actions}
                    </div>
                ) : null}
            </div>
        </header>
    );
}

export default PageHeader;
