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

export default function AlertaMatriz({ rows, level, onRowClick, onCellClick, }: Props) {

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
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4">

            <div className="flex items-center justify-center">

                <div className="rounded-xl bg-[#BC955B] px-8 py-3 shadow-sm">

                    <span className="text-lg font-semibold text-white">
                        Matriz {" "}
                        {level === "estado"
                            ? "Nacional"
                            : rows.length > 0 ? <span className="capitalize">{rows[0].name.toLocaleLowerCase()}</span> : "Municipal"}

                    </span>

                </div>

            </div>

            <div className="overflow-auto">
                <table className="border-separate min-w-max">

                    <thead>
                        <tr>
                            <th className="sticky left-0 z-20 min-w-[180px]"></th>

                            {dates.map(date => (

                                <th
                                    key={date}
                                    className="h-16 min-w-[24px] align-bottom"
                                >

                                    <div className="-rotate-90 origin-bottom-left whitespace-nowrap text-[8px] font-medium text-slate-500">
                                        {date}
                                    </div>

                                </th>

                            ))}

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-100">

                        {rows.map(row => (

                            <tr key={row.id} className="border-b border-slate-100">

                                <td className="sticky left-0 z-10 bg-white pr-2 py-1">

                                    <button
                                        onClick={() => {
                                            if (level === "estado") {
                                                onRowClick?.(row.estadoId);
                                            }
                                        }}
                                        className="group flex items-center gap-1 text-left transition-all cursor-pointer"
                                    >
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#000]" />
                                        <span className="text-sm font-semibold text-slate-700 group-hover:text-[#611232]">
                                            {row.name}
                                        </span>

                                    </button>

                                </td>

                                {row.values.map(
                                    value => (

                                        <td
                                            key={value.day}
                                            className="p-0 text-center"
                                        >

                                            <button
                                                onClick={() =>
                                                    onCellClick?.({ estadoId: value.estadoId, municipioId: value.municipioId, fecha: value.day })
                                                }
                                                title={`${value.total} registros`}
                                                className={`
                                                flex
                                                h-4
                                                w-4
                                                items-center
                                                justify-center
                                                rounded-md
                                                text-[8px]
                                                font-semibold
                                                text-white
                                                transition-all
                                                duration-200
                                                hover:scale-110
                                                hover:shadow-xl
                                                hover:ring-2
                                                hover:ring-offset-2
                                                hover:ring-[#611232]
                                                cursor-pointer
                                                ${getColor(value.estatus)}
                                            `}
                                            >
                                                {value.total > 0
                                                    ? value.total
                                                    : ""}
                                            </button>

                                        </td>

                                    )
                                )}

                            </tr>

                        ))}

                    </tbody>

                </table>
            </div>

        </div>
    )

}