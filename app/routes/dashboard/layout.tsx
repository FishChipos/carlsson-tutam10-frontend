import { Outlet } from "react-router";
import Sidebar from "./sidebar";

export default function Layout() {
    return (
        <div className="flex w-full grow">
            <Sidebar></Sidebar>
            <Outlet />
        </div>
    );
}
