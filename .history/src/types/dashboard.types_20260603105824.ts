export interface HeatmapCell {
    day: string;
    total: number;
}

export interface HeatmapValue {
    day: string;
    total: number;
    estatus: string;
    estadoId: number;
    municipioId: number;
}

export interface HeatmapRow {
    id: string;
    estadoId: number;
    name: string;
    values: HeatmapValue[];
}

export interface MunicipioData {
    estadoId: string;
    municipios: HeatmapRow[];
}

export type DashboardLevel =
    | "estado"
    | "municipio";

export interface DashboardState {
    level: DashboardLevel;
    selectedState: HeatmapRow | null;
}
