interface Props{
    typeButton: "button" | "submit" | "reset" | undefined;
    className: string;
    text: string;
}

export function ButtonForm({ typeButton, className, text }: Props) {
    
    return (
        <button
            type={ typeButton }
            className={ className }
        >
            { text }
        </button>
    )

}