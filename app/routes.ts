import {
    type RouteConfig,
    index,
    route,
} from "@react-router/dev/routes";

export default [
    index("./routes/home.tsx"),
    route("/login", "./routes/login/login.tsx"),
    route("/register", "./routes/register/register.tsx"),
    route("/dashboard", "./routes/dashboard/layout.tsx", [
        index("./routes/dashboard/dashboard.tsx"),
        route("tournaments", "./routes/dashboard/tournaments/tournaments.tsx"),
        route("organizations", "./routes/dashboard/organizations/organizations.tsx"),
    ]),
] satisfies RouteConfig;
