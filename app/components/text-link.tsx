import { Link } from "react-router";

export default function TextLink({ children, to }: {
    children: React.ReactNode;
    to: string;
}) {
    return (
        <Link to={to} className="text-purple-700 hover:text-purple-800 hover:underline">{children}</Link>
    )
}
