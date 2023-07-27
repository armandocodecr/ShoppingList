interface Props{
    typeButton: "button" | "submit" | "reset" | undefined;
    className: string;
    text: string;
    onClickFunction?: () => void;
}

export function ButtonComponent({ typeButton, className, text, onClickFunction }: Props) {
    
    return (
        <button
            type={ typeButton }
            className={ className }
            onClick={onClickFunction}
        >
            { text }
        </button>
    )

}