import { useMemo } from "react";

import type { HeatmapRow } from "../../../types/dashboard.types";

interface Props {
    rows: HeatmapRow[];
    level: "estado" | "municipio";
    onRowClick?: (estadoId: number) => void;
    onCellClick?: (
        data: {
            estadoId: number;
            municipioId: number;
            fecha: string;
        }
    ) => void;
}

export default function AlertaMatriz({
    rows,
    level,
    onRowClick,
    onCellClick,
}: Props) {

    const dates = useMemo(() => {
        if (!rows.length) return [];

        return rows[0].values.map(
            value => value.day
        );
    }, [rows]);

    const getColor = (estatus: string) => {
        switch (estatus?.toLowerCase()) {
            case "rojo":
                return "bg-[#611232]";
            case "naranja":
                return "bg-orange-500";
            case "verde":
                return "bg-[#00AFAA]";
            default:
                return "bg-slate-200";
        }
    };

    if (!rows.length) {
        return (
            <div className="flex h-64 items-center justify-center rounded-3xl border border-slate-200 bg-white">
                <span className="text-slate-500">
                    No hay información disponible
                </span>
            </div>
        );
    }

    return (
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-3 lg:p-4">

            <div className="mb-4 flex items-center justify-center">

                <div className="rounded-xl bg-[#BC955B] px-6 py-2 lg:px-8 lg:py-3 shadow-sm">

                    <span className="text-sm lg:text-base xl:text-lg font-semibold text-white">
                        Matriz{" "}
                        {
                            level === "estado"
                                ? "Nacional"
                                : rows.length > 0
                                    ? rows[0].name.toLowerCase()
                                    : "Municipal"
                        }
                    </span>

                </div>

            </div>

            <div className="overflow-auto w-full max-h-[75vh]">

                <table className="border-collapse">

                    <thead>

                        <tr>

                            <th
                                className="
                                    sticky
                                    left-0
                                    z-20
                                    bg-white
                                    min-w-[140px]
                                    lg:min-w-[180px]
                                    xl:min-w-[220px]
                                    2xl:min-w-[260px]
                                "
                            />

                            {dates.map(date => (

                                <th
                                    key={date}
                                    className="
                                        p-0
                                        align-bottom
                                        h-14 w-3
                                        lg:h-20 lg:w-4
                                        xl:h-24 xl:w-5
                                        2xl:h-28 2xl:w-6
                                    "
                                >

                                    <div
                                        className="
                                            -rotate-90
                                            origin-bottom-left
                                            whitespace-nowrap
                                            text-[7px]
                                            lg:text-[8px]
                                            xl:text-[9px]
                                            2xl:text-[10px]
                                            font-medium
                                            text-slate-500
                                        "
                                    >
                                        {date}
                                    </div>

                                </th>

                            ))}

                        </tr>

                    </thead>

                    <tbody>

                        {rows.map(row => (

                            <tr key={row.id}>

                                <td
                                    className="
                                        sticky
                                        left-0
                                        z-10
                                        bg-white
                                        py-[1px]
                                        pr-1
                                    "
                                >

                                    <button
                                        onClick={() => {
                                            if (level === "estado") {
                                                onRowClick?.(row.estadoId);
                                            }
                                        }}
                                        className="
                                            group
                                            flex
                                            items-center
                                            gap-1
                                            text-left
                                            cursor-pointer
                                        "
                                    >

                                        <span
                                            className="
                                                truncate
                                                text-[11px]
                                                lg:text-xs
                                                xl:text-sm
                                                2xl:text-base
                                                font-medium
                                                text-slate-700
                                                group-hover:text-[#611232]
                                            "
                                        >
                                            {row.name}
                                        </span>

                                    </button>

                                </td>

                                {row.values.map(value => (

                                    <td
                                        key={value.day}
                                        className="p-0"
                                    >

                                        <button
                                            onClick={() =>
                                                onCellClick?.({
                                                    estadoId: value.estadoId,
                                                    municipioId: value.municipioId,
                                                    fecha: value.day,
                                                })
                                            }
                                            title={`${value.total} registros`}
                                            className={`
                                                h-3 w-3
                                                lg:h-4 lg:w-4
                                                xl:h-5 xl:w-5
                                                2xl:h-6 2xl:w-6
                                                border
                                                border-white/30
                                                ${getColor(value.estatus)}
                                                transition-all
                                                duration-200
                                                hover:scale-125
                                                hover:z-20
                                                hover:relative
                                                cursor-pointer
                                            `}
                                        />

                                    </td>

                                ))}

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}