import { useEffect, useState } from "react";

import HeatmapTable from "../components/Dashboard/heatmap/HeatmapTable";

import SexoChart from "../components/Dashboard/charts/SexoChart";

import type { HeatmapRow } from "../types/dashboard.types";

import { GetEntidadesByAlertaTable, GetTotalesIncremento } from "../services/dashboard.service";
import EdadChart from "../components/Dashboard/charts/EdadChart";
import EnfoqueChart from "../components/Dashboard/charts/EnfoqueChart";

export default function EstadisticasPage() {

    const [filters, setFilters] = useState<{ estado_id: number | null, municipio_id: number | null }>({ estado_id: null, municipio_id: null });

    const [heatmapEstados, setHeatmapEstados] = useState<HeatmapRow[]>([]);
    const [dataChart, setDataChart] = useState<any>(null);

    const [loadingHeatmap, setLoadingHeatmap] = useState<boolean>(true);
    const [loadingCharts, setLoadingCharts] = useState<boolean>(true);

    useEffect(() => {
        loadData();
    }, [filters]);

    const loadData = async () => {

        try {

            setLoadingHeatmap(true);
            setLoadingCharts(true);

            const [matrizResp, chartResp] = await Promise.allSettled([
                GetEntidadesByAlertaTable(filters.estado_id, filters.municipio_id),
                GetTotalesIncremento(filters.estado_id, filters.municipio_id)
            ]);

            if (matrizResp.status === "fulfilled") {
                const rows: HeatmapRow[] = matrizResp.value.map((item: any) => ({
                    id: String(item.estado_id),
                    estadoId: item.estado_id,
                    name: item.entidad,
                    values:
                        item.detalleUltimos30Dias.map(
                            (dia: any) => ({
                                day: dia.fecha.slice(0, 10),
                                total: dia.totalRegistros,
                                estatus: dia?.estatusDia,
                                estadoId: item?.estado_id,
                                municipioId: 1, // temporal
                            })
                        ),
                }));

                setHeatmapEstados(rows);
            }

            if (chartResp.status === "fulfilled") {
                setDataChart(chartResp.value);
            }


        } catch (error) {
            console.log("No se pudo obtener la información de la tabla de entidades inicial");
        } finally {
            setLoadingHeatmap(false);
            setLoadingCharts(false);
        }

    };

    const handleEstadoClick = (estadoId: number) => {
        setFilters({
            estado_id: estadoId,
            municipio_id: null,
        });

    };

    const handleCellClick = (data: { estadoId: number; municipioId: number; fecha: string; }) => {
        //console.log("Click celda", data);

        setFilters(prev => ({
            ...prev,
            estado_id:
                data.estadoId,
        }));

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

                    {/* Matriz de datos */}
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <HeatmapTable
                            rows={heatmapEstados}
                            level="estado"
                            onRowClick={handleEstadoClick}
                            onCellClick={handleCellClick}
                        />
                    </div>

                    <div>
                        <SexoChart sexo={dataChart?.sexo} />
                    </div>

                    <div>
                        <EdadChart grupoEtario={dataChart?.grupoEtario} />
                    </div>

                    <div>
                        <EnfoqueChart enfoqueDiferenciado={dataChart?.enfoqueDiferenciado} />
                    </div>
                </div>
            </div>
        </>
    );
}