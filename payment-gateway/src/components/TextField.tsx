import React, { useState } from "react";
import { StyledInput, StyledLabel } from "./styles/Input.styled";
// import { IconButton } from "@material-ui/core";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { IconButton } from "./styles/IconButton.styled";

interface TextFieldProps {
    label: string;
    placeholder?: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
}

const TextField: React.FC<TextFieldProps> = ({
    label,
    placeholder,
    type,
    name,
    value,
    onChange,
    onBlur,
    error,
    helperText,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = (): void => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
    };

    return (
        <div style={{ padding: "0.5em 0" }}>
            <StyledLabel htmlFor={name}>{label}</StyledLabel>

            <div className="flex justify-between items-center">
                <StyledInput
                    type={showPassword ? 'text' : type}
                    id={name}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={(e) => {
                        onChange(e);
                    }}
                    onBlur={onBlur}
                    className={error ? "error" : ""}
                    data-error={error ? helperText : ""}
                />
                {type === "password" && (
                    <div className="ml-[-52px] mr-4 z-[10]">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                        </IconButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextField;
