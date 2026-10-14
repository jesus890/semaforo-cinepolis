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
            case "critico":
                return "bg-red-600";
            case "alerta":
                return "bg-orange-500";
            case "preventivo":
                return "bg-amber-400";
            case "normal":
                return "bg-emerald-500";
            default:
                return "bg-slate-200";
        }
    };

}