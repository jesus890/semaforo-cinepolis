import { useMemo } from "react";

interface HeatmapValue {
    day: string;
    total: number;
    estatus: string;
    estadoId: number;
    municipioId: number;
}

interface HeatmapRow {
    id: string;
    estadoId: number;
    name: string;
    values: HeatmapValue[];
}

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