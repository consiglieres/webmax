import type {ButtonHTMLAttributes, ReactElement, ReactNode} from "react";
import "./button.css";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
}

function Button({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    type = "button",
    ...rest
}: ButtonProps): ReactElement {
    const classNames = [
        "ui-button",
        `ui-button--${variant}`,
        `ui-button--${size}`,
        fullWidth ? "ui-button--full" : "",
        className,
    ].filter(Boolean).join(" ");

    return (
        <button className={classNames} type={type} {...rest}>
            {children}
        </button>
    );
}

export default Button;
