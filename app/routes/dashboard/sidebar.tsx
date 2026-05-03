import IconHome from "~/icons/home";
import IconTournaments from "~/icons/tournaments";
import IconOrganizations from "~/icons/organizations";

import { Link } from "react-router";

export default function Sidebar() {
    const cells = [
        [IconHome, "/dashboard"],
        [IconTournaments, "/dashboard/tournaments"],
        [IconOrganizations, "/dashboard/organizations"],
    ];

    return (
        <div className="w-16 flex flex-col items-center bg-neutral-800 text-white">
            {
                cells.map((cell, index) => {
                    const Icon = cell[0];
                    const dest = cell[1];

                    return (
                        <Link key={index} className="w-full h-16" to={dest as string}>
                            <div className="p-4 items-center transition hover:bg-neutral-900">
                                <Icon />
                            </div>
                        </Link>
                    );
                })
            }
        </div>
    );
}
