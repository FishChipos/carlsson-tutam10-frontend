import { Link, redirect } from "react-router";

export async function loader() {
    return redirect("/login");
}

export default function Home() {
    return (
        <Link to="/login">Login</Link>
    )
}

