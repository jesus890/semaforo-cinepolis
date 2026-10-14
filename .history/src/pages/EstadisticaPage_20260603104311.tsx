import { useEffect, useState } from "react";

import type { HeatmapRow } from "../types/dashboard.types";
import { GetEntidadesByAlertaTable } from "../services/dashboard.service";

export default function EstadisticasPage() {

    const [filters, setfilters] = useState({ estado_id: null, municipio_id: null });

    const [heatmapEstados, setHeatmapEstados] = useState<HeatmapRow[]>([]);
    const [loadingHeatmap, setLoadingHeatmap] = useState<boolean>(false);

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
                                    day: dia.fecha.slice(0, 10),
                                    total: dia.totalRegistros,
                                    estatus: dia.estatusDia,
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