import {
    BarChart3,
    Map,
} from "lucide-react";

import {
    NavLink,
} from "react-router-dom";

export default function Sidebar() {

    const menu = [
        {
            label: "Estadísticas",
            icon: BarChart3,
            path: "/estadisticas",
        },
        {
            label: "Estadísticas 2",
            icon: Map,
            path: "/estadisticas-2",
        },
    ];

    return (

        <aside
            className="
                w-[280px]
                border-r
                border-gray-200
                bg-white
                p-6
            "
        >

            <div className="mb-10">

                <h1
                    className="
                        text-2xl
                        font-bold
                        text-[#611232]
                    "
                >
                    Dashboard
                </h1>

            </div>

            <nav className="space-y-2">

                {menu.map((item) => {

                    const Icon =
                        item.icon;

                    return (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({
                                isActive,
                            }) =>
                                `
                                flex
                                items-center
                                gap-3
                                rounded-2xl
                                px-4
                                py-3
                                transition-all

                                ${
                                    isActive
                                        ? "bg-[#611232] text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                }
                            `
                            }
                        >

                            <Icon
                                size={20}
                            />

                            {item.label}

                        </NavLink>
                    );
                })}

            </nav>

        </aside>
    );
}