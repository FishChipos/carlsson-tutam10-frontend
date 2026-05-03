import axios from "axios";
import { data, useLoaderData, type LoaderFunctionArgs } from "react-router";

import Card from "~/components/card";
import TextLink from "~/components/text-link";

interface Tournament {
    name: string;
    organizationId: string;
    startTime: string;
    visibility: "public" | "unlisted" | "private";
    tabLink: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
    const tournamentsRes = await axios.get(`${import.meta.env.VITE_API_URL}/tournament`);
    const tournaments: Tournament[] = tournamentsRes.data.payload;
    const organizationNames: string[] = [];

    for (const tournament of tournaments) {
        const organizationId = tournament.organizationId;
        
        const organizationRes = await axios.get(`${import.meta.env.VITE_API_URL}/organization/${organizationId}`);

        organizationNames.push(organizationRes.data.payload.name);
    }

    return data({ tournaments, organizationNames }, { status: 200 });
}

export default function Tournaments() {
    const loaderData = useLoaderData();
    const tournaments: Tournament[] = loaderData.tournaments;
    const organizationNames: string[] = loaderData.organizationNames;

    return (
        <div className="flex grow h-full p-6 justify-center align-middle">
            {
                tournaments.map((tournament, index) => (
                    <Card key={index} header={tournament.name}>
                        <div>Organized by {organizationNames[index]}</div>
                        <div><TextLink to={tournament.tabLink}>{tournament.tabLink}</TextLink></div>
                    </Card>
                ))
            }
        </div>
    );
}
