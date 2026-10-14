"use client";

import { useEffect, useState } from "react";

import type { HeatmapRow } from "../../../types/dashboard.types";

import { GetEntidadesByAlertaTable } from "../../../services/dashboard.service";

interface Props {
    level: "estado" | "municipio";
    onRowClick?: (row: HeatmapRow) => void;
}

export default function HeatmapTable({
    level,
    onRowClick,
}: Props) {

    const [heatmapEstados, setHeatmapEstados] = useState<HeatmapRow[]>([]);
    const [loadingHeatmap, setLoadingHeatmap] = useState(false);

    useEffect(() => {
        loadHeatmap();
    }, []);

    const loadHeatmap = async () => {

        try {

            setLoadingHeatmap(true);

            const response = await GetEntidadesByAlertaTable();

            const rows: HeatmapRow[] =
                response.map(
                    (
                        item: any,
                        index: number
                    ) => ({
                        id: String(index),
                        name: item.entidad,
                        values:
                            item.detalleUltimos30Dias.map(
                                (dia: any) => ({
                                    day:dia.fecha.slice(0, 10),
                                    total:dia.totalRegistros,
                                    estatus:dia.estatusDia,
                                })
                            ),
                    })
                );

            setHeatmapEstados(rows);

        } catch (error) {

            console.log(
                "No se pudo obtener la información de la tabla de entidades inicial"
            );

        } finally {

            setLoadingHeatmap(false);

        }

    };

    function getIntensityColor(
        estatus: string
    ) {

        switch (estatus?.toUpperCase()) {

            case "VERDE":
                return "#00AFAA";

            case "NARANJA":
                return "#F59E0B";

            case "ROJO":
                return "#611232";

            default:
                return "#E5E7EB";
        }
    }

    const days =
        heatmapEstados[0]?.values || [];

    if (loadingHeatmap) {

        return (
            <div
                className="
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                    p-8
                    text-center
                "
            >
                Cargando información...
            </div>
        );
    }

    return (

        <div
            className="
                rounded-3xl
                border
                border-gray-200
                bg-white
                shadow-sm
                overflow-hidden
            "
        >

            <div
                className="
                    overflow-x-auto
                    overflow-y-auto
                    max-h-[700px]
                "
            >

                <table
                    className="
                        min-w-full
                        border-collapse
                    "
                >

                    <thead
                        className="
                            sticky
                            top-0
                            bg-white
                            z-20
                        "
                    >

                        <tr>

                            <th
                                className="
                                    sticky
                                    left-0
                                    z-30
                                    bg-white
                                    border-b
                                    border-gray-200
                                    px-4
                                    py-3
                                    text-left
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                "
                            >

                                {
                                    level === "estado"
                                        ? "Estado"
                                        : "Municipio"
                                }

                            </th>

                            {days.map(
                                (day) => (

                                    <th
                                        key={day.day}
                                        className="
                                            border-b
                                            border-gray-200
                                            px-3
                                            py-3
                                            text-center
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                        "
                                    >

                                        {day.day}

                                    </th>
                                )
                            )}

                        </tr>

                    </thead>

                    <tbody>

                        {heatmapEstados.map(
                            (row) => (

                                <tr
                                    key={row.id}
                                >

                                    <td
                                        onClick={() => {

                                            if (
                                                level ===
                                                "estado"
                                            ) {

                                                onRowClick?.(
                                                    row
                                                );
                                            }
                                        }}
                                        className={`
                                            sticky
                                            left-0
                                            bg-white
                                            border-b
                                            border-gray-100
                                            px-4
                                            py-3
                                            text-sm
                                            font-medium
                                            z-10

                                            ${level === "estado"
                                                ? "cursor-pointer hover:text-[#611232]"
                                                : ""
                                            }
                                        `}
                                    >

                                        {row.name}

                                    </td>

                                    {row.values.map(
                                        (
                                            cell,
                                            index
                                        ) => (

                                            <td
                                                key={`${row.id}-${index}`}
                                                className="
                                                    border-b
                                                    border-gray-100
                                                    p-1
                                                "
                                            >

                                                <div
                                                    className="
                                                    flex
                                                    justify-center
                                                        h-8
                                                        w-8
                                                        rounded-md
                                                        transition-all
                                                        cursor-pointer
                                                        hover:scale-110
                                                    "
                                                    style={{
                                                        backgroundColor:
                                                            getIntensityColor(
                                                                cell.estatus
                                                            ),
                                                    }}
                                                    title={`
                                                        ${row.name}
                                                        Día ${cell.day}
                                                        ${cell.total} registros
                                                        Estatus: ${cell.estatus}
                                                    `}
                                                />

                                            </td>
                                        )
                                    )}

                                </tr>
                            )
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}