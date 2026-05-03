export default function TextField({ title, name, placeholder }: {
    title?: string;
    name: string;
    placeholder?: string;
}) {
    return (
        <div className="w-full flex flex-col gap-2">
            {
                title ?
                <div>{title}</div>
                : ""
            }
            <input 
                name={name}
                placeholder={placeholder ? placeholder : ""}
                className="w-full p-2 border border-neutral-300 rounded-sm"
            />
        </div>
    );
}
