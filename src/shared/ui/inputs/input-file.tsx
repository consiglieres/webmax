import type {InputHTMLAttributes, ReactElement} from "react";
import "./input-file.css";

type InputFileProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

function InputFile({className = "", ...rest}: InputFileProps): ReactElement {
    return <input type="file" className={`input-file ${className}`.trim()} {...rest} />;
}

export default InputFile;
