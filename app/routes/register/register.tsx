import { data, redirect, useFetcher, Form, type ActionFunctionArgs, useActionData } from "react-router";
import axios from "axios";

import Card from "~/components/card";
import TextField from "~/components/text-field";
import Button from "~/components/button";
import TextLink from "~/components/text-link";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const errors = {
        name: false, email: false, password: false,
    };
    let success = true;

    if (!name) {
        errors.name = true;
        success = false;
    }

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

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user?register`, {
        name, email, password
    });

    if (res) {
        return redirect("/login")
    }
}

export default function Register() {
    const data = useActionData();
    const errors = data?.errors ?? {
        name: false, email: false, password: false,
    };

    return (
        <div className="flex grow p-6 justify-center items-center">
            <div className="w-lg">
                <Card>
                    <Form method="post" className="flex flex-col gap-6">
                        <div className="font-bold text-2xl">Register here</div>
                        <div className="flex flex-col gap-2">
                            <TextField
                                title="Name"
                                name="name"
                                placeholder="John Doe"
                            />
                            {
                                errors.name
                                ? <div className="text-red-700">
                                    Name is required.
                                </div>
                                : ""
                            }
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
                                Register
                            </Button>
                            <div className="text-center">
                                <span>
                                    Already have an account?&nbsp;
                                </span>
                                <TextLink to="/login">Log in here</TextLink>
                            </div>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
