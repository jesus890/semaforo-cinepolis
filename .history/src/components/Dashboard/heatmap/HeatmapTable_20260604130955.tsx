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

export default function HeatmapTable({ rows, onRowClick, onCellClick, }: Props) {

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

    return (
        <div className="overflow-auto rounded-3xl border border-slate-200 bg-white p-4">

            <table className="border-separate  min-w-max">

                <thead>
                    <tr>
                        <th className="sticky left-0 z-20 bg-white min-w-[240px]"></th>

                        {dates.map(date => (

                            <th
                                key={date}
                                className="h-28 min-w-[42px] align-bottom"
                            >

                                <div className="-rotate-45 origin-bottom-left whitespace-nowrap text-[10px] font-medium text-slate-500">
                                    {date}
                                </div>

                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>

                    {rows.map(row => (

                        <tr key={row.id}>

                            <td className="sticky left-0 z-10 bg-white pr-4">

                                <button
                                    onClick={() => onRowClick?.(row.estadoId)}
                                    className="group flex tems-center gap-3 text-left transition-all cursor-pointer"
                                >
                                    <span className="text-sm font-semibold text-slate-700 group-hover:text-[#611232]">
                                        {row.name}
                                    </span>

                                </button>

                            </td>

                            {row.values.map(
                                value => (

                                    <td
                                        key={value.day}
                                    >

                                        <button
                                            onClick={() =>
                                                onCellClick?.({estadoId:value.estadoId,municipioId:value.municipioId,fecha:value.day})
                                            }
                                            title={`${value.total} registros`}
                                            className={`
                                                h-8
                                                w-8
                                                rounded-lg
                                                transition-all
                                                hover:scale-110
                                                hover:shadow-lg
                                                hover:ring-2
                                                hover:ring-[#611232]
                                                cursor-pointer
                                                ${getColor(
                                                value.estatus
                                            )}
                                            `}
                                        />

                                    </td>

                                )
                            )}

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    )

}