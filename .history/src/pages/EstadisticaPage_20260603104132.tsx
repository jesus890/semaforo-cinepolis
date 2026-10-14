import { useState } from "react";

import type { HeatmapRow } from "../types/dashboard.types";


export default function EstadisticasPage() {

    const [heatmapEstados, setHeatmapEstados] = useState<HeatmapRow[]>([]);
    const [loadingHeatmap, setLoadingHeatmap] = useState<boolean>(false);

    return (
        <>
            <div className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-[1800px] px-6 lg:px-8">

                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-[#611232]">
                            Panel Estadístico
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Visualización geoespacial y temporal de registros
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
}