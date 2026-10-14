"use client";

import type { HeatmapRow } from "../../../types/dashboard.types";



interface Props {
    rows: HeatmapRow[];

    level: "estado" | "municipio";

    onRowClick?: (
        row: HeatmapRow
    ) => void;
}

export default function HeatmapTable({
    rows,
    level,
    onRowClick,
}: Props) {

    function getIntensityColor(
        value: number
    ) {

        if (value === 0) {
            return "#F3F4F6";
        }

        if (value <= 30) {
            return "#00AFAA";
        }

        return "#611232";
    }

    const days =
        rows[0]?.values || [];

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
                                    level ===
                                        "estado"
                                        ? "Estado"
                                        : "Municipio"
                                }

                            </th>

                            {days.map(
                                (day) => (

                                    <th
                                        key={
                                            day.day
                                        }
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

                        {rows.map(
                            (row) => (

                                <tr
                                    key={
                                        row.id
                                    }
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

                                            ${
                                                level ===
                                                "estado"
                                                    ? "cursor-pointer hover:text-[#611232]"
                                                    : ""
                                            }
                                        `}
                                    >

                                        {
                                            row.name
                                        }

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
                                                                cell.total
                                                            ),
                                                    }}
                                                    title={`
                                                        ${row.name}
                                                        | Día ${cell.day}
                                                        | ${cell.total} registros
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