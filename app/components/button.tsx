import { type MouseEventHandler } from "react"

export default function Button({ children, className, type, onClick }: {
    children: React.ReactNode;
    className?: string;
    type?: "button" | "reset" | "submit" | undefined;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button 
            className={`cursor-pointer w-full p-2 rounded-sm ${className}`}
            type={type ? type : "button"}
            onClick={onClick ? onClick : () => {}}
        >
            {children}
        </button>
    );
}
