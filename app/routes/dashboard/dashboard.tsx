import { type LoaderFunctionArgs, redirect, Form, type ActionFunctionArgs, useLoaderData, data } from "react-router";
import axios from "axios";

import Sidebar from "./sidebar";
import Button from "~/components/button";

import { destroySession, getSession } from "~/sessions";

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get("Cookie"));

    if (!session.has("jwtToken")) {
        return redirect("/login");
    }

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user?validate`, {
        jwtToken: session.get("jwtToken"),
    });
    
    if (!res.data.success) {
        return redirect("/login");
    }

    const userRes = await axios.get(`${import.meta.env.VITE_API_URL}/user/${session.get("userId")}`);
    const user = userRes.data.payload;

    return data({ user }, { status: 200 });
}

export async function action({ request }: ActionFunctionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    await destroySession(session);
    return redirect("/login");
}

export default function Dashboard() {
    const loaderData = useLoaderData();
    const user = loaderData.user;

    return (
        <div className="flex grow h-full p-6 justify-center align-middle">
            <div className="flex w-full">
                <div className="grow font-bold text-2xl">Hello, {user.name}</div>
                <Form method="post">
                    <Button type="submit" className="text-white bg-red-500 hover:bg-red-700">Log out</Button>
                </Form>
            </div>
        </div>
    );
}
