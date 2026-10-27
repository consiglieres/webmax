import {type ChangeEvent, type ReactElement, useId, useState} from "react";
import Field from "./field.tsx";
import "./input-combobox.css";

export interface ComboboxOption {
    value: string;
    label: string;
}

interface InputComboboxProps {
    label: string;
    name: string;
    value: string;
    options: ComboboxOption[];
    onChange: (value: string) => void;
    placeholder?: string;
    hint?: string;
    fullWidth?: boolean;
    required?: boolean;
}

function InputCombobox({
    label,
    name,
    value,
    options,
    onChange,
    placeholder,
    hint,
    fullWidth = false,
    required,
}: InputComboboxProps): ReactElement {
    const listId = useId();
    const [isOpen, setIsOpen] = useState(false);
    const normalizedValue = value.trim().toLowerCase();
    const filteredOptions = normalizedValue
        ? options.filter((option) => option.label.toLowerCase().includes(normalizedValue))
        : options;
    const showOptions = isOpen && filteredOptions.length > 0;

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        onChange(event.target.value);
        setIsOpen(true);
    };

    const handleSelect = (option: ComboboxOption): void => {
        onChange(option.label);
        setIsOpen(false);
    };

    return (
        <Field label={label} hint={hint} fullWidth={fullWidth} required={required}>
            <div className="combobox">
                <input
                    className="field__control"
                    type="text"
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    autoComplete="off"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={showOptions}
                    aria-controls={listId}
                    required={required}
                    onChange={handleChange}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setIsOpen(false)}
                />

                {showOptions ? (
                    <ul className="combobox__list" id={listId} role="listbox">
                        {filteredOptions.map((option) => (
                            <li key={option.value}>
                                <button
                                    className="combobox__option"
                                    type="button"
                                    role="option"
                                    aria-selected={option.label === value}
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={() => handleSelect(option)}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        </Field>
    );
}

export default InputCombobox;
