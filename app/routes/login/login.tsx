import { Form, type ActionFunctionArgs, useFetcher, data, redirect, useActionData } from "react-router";
import axios from "axios";

import Card from "~/components/card";
import Button from "~/components/button";
import TextField from "~/components/text-field";
import TextLink from "~/components/text-link";

import { getSession, commitSession } from "~/sessions";

export async function action({ request }: ActionFunctionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const formData = await request.formData();

    const email = formData.get("email");
    const password = formData.get("password");

    let success = true;
    const errors = {
        email: false, password: false,
    };

    if (!email) {
        errors.email = true;
        success = false;
    }

    if (!password) {
        errors.password = true;
        success = false;
    }

    if (!success) {
        return data({ errors }, { status: 400 });
    }

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user?login`, {
        email, password
    });

    if (res) {
        session.set("userId", res.data.payload.user.userId);
        session.set("jwtToken", res.data.payload.jwtToken);

        return redirect("/dashboard", {
            headers: {
                "Set-Cookie": await commitSession(session),
            }
        })
    }
}

export default function Login() {
    const data = useActionData();
    const errors = data?.errors ?? {
        email: false, password: false,
    };

    return (
        <div className="flex grow p-6 justify-center items-center">
            <div className="w-lg">
                <Card>
                    <Form method="post" className="flex flex-col gap-6">
                        <div className="font-bold text-2xl">Log in here</div>
                        <div className="flex flex-col gap-2">
                            <TextField
                                title="Email"
                                name="email"
                                placeholder="example@email.com"
                            />
                            {
                                errors.email
                                ? <div className="text-red-700">
                                    Email is required.
                                </div>
                                : ""
                            }
                            <TextField
                                title="Password"
                                name="password"
                                placeholder="mySecurePassword123!"
                            />
                            {
                                errors.password
                                ? <div className="text-red-700">
                                    Password is required.
                                </div>
                                : ""
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button
                                className="transition bg-emerald-500 hover:bg-emerald-600 text-white"
                                type="submit"
                            >
                                Log in
                            </Button>
                            <div className="text-center">
                                <span>
                                    Don't have an account?&nbsp;
                                </span>
                                <TextLink to="/register">Register here</TextLink>
                            </div>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
