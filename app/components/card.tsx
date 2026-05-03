export default function Card({ header, children }: {
    header?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col size-full grow border border-neutral-300 rounded-sm">
            { 
                header ? 
                <div className="bg-neutral-100 p-6 py-4 border-b font-bold">
                    {header}
                </div> 
                : ""
            }
            <div className="p-6">
                {children}
            </div>
        </div>
    );
}
