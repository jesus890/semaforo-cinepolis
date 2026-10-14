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
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-3">

            <div className="mb-3 flex items-center justify-center">

                <div className="rounded-xl bg-[#BC955B] px-6 py-2 shadow-sm">

                    <span className="text-base font-semibold text-white">
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

            <div className="overflow-auto">

                <table className="border-collapse">

                    <thead>

                        <tr>

                            <th className="sticky left-0 z-20 min-w-[140px] bg-white"></th>

                            {dates.map(date => (

                                <th
                                    key={date}
                                    className="h-14 w-3 p-0 align-bottom"
                                >

                                    <div className="-rotate-90 origin-bottom-left whitespace-nowrap text-[11px] font-medium text-slate-500">
                                        {date}
                                    </div>

                                </th>

                            ))}

                        </tr>

                    </thead>

                    <tbody>

                        {rows.map(row => (

                            <tr key={row.id}>

                                <td className="sticky left-0 z-10 bg-white py-[1px] pr-1">

                                    <button
                                        onClick={() => {
                                            if (level === "estado") {
                                                onRowClick?.(row.estadoId);
                                            }
                                        }}
                                        className="group flex items-center gap-1 text-left cursor-pointer"
                                    >

                                        <span className="text-[11px] font-medium text-slate-700 group-hover:text-[#611232] truncate">
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
                                                    fecha: value.day
                                                })
                                            }
                                            title={`${value.total} registros`}
                                            className={`
                                                h-3
                                                w-3
                                                border
                                                border-white/30
                                                ${getColor(value.estatus)}
                                                hover:scale-125
                                                hover:z-20
                                                hover:relative
                                                cursor-pointer
                                                transition-transform
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