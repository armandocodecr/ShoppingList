import { ChangeEvent } from 'react';

interface Props{
    className        : string;
    typeInput        : "text";
    placeholder      : string;
    value            : string | number
    onChangeFunction?: (ev: ChangeEvent<HTMLInputElement>) => void;
}

export function InputComponent({ typeInput, className, onChangeFunction, value, placeholder }: Props) {
    
    return (
        <input
            type={ typeInput }
            className={ className }
            placeholder={placeholder}
            value={value}
            onChange={onChangeFunction}
        />
    )
}