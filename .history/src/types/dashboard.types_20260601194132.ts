export interface HeatmapCell {
    day: string;
    total: number;
}

export interface HeatmapRow {
    id: string;
    name: string;
    values: HeatmapCell[];
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