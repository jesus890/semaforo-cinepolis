import { useEffect, useState } from "react";

import HeatmapTable from "../components/Dashboard/heatmap/HeatmapTable";

import SexoChart from "../components/Dashboard/charts/SexoChart";

import type { HeatmapRow } from "../types/dashboard.types";

import { GetEntidadesByAlertaTable, GetEntidadesByAlertaTableEstado, GetTotalesIncremento } from "../services/dashboard.service";
import EdadChart from "../components/Dashboard/charts/EdadChart";
import EnfoqueChart from "../components/Dashboard/charts/EnfoqueChart";
import LoaderStyled from "../components/Dashboard/Loader/Loader";

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
                (filters.estado_id != null ? GetEntidadesByAlertaTableEstado(filters.estado_id) : GetEntidadesByAlertaTable()),
                GetTotalesIncremento(filters.estado_id, filters.municipio_id)
            ]);

            if (matrizResp.status === "fulfilled") {
                const rows: HeatmapRow[] = matrizResp.value.map((item: any) => ({
                    id: String(item.idEstado),
                    estadoId: item.idEstado,
                    name: item.entidad,
                    values:
                        item.detalleUltimos30Dias.map(
                            (dia: any) => ({
                                day: dia.fecha.slice(0, 10),
                                total: dia.totalRegistros,
                                estatus: dia?.estatusDia,
                                estadoId: item?.idEstado,
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
        console.log("Click en: ", estadoId)
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

                    <div className="mb-8 border-b border-gray-200 pb-5">
                        <h1 className="text-4xl font-bold text-[#611232]">
                            Panel Estadístico
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Análisis estadístico y comportamiento de registros por entidad federativa.
                        </p>
                    </div>


                    {/* Matriz de datos */}
                    <section className="bg-slate-50 mb-8">
                        <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-800">
                                        Matriz de Comportamiento por Entidad Federativa
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Monitoreo de registros durante los últimos 30 días
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 text-xs">

                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-[#611232]" />
                                        <span>Alto</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-orange-500" />
                                        <span>Medio</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-[#00AFAA]" />
                                        <span>Bajo</span>
                                    </div>
                                </div>

                                {
                                    filters.estado_id != null && (
                                        <div >
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold cursor-pointer"
                                                onClick={() => setFilters(prev => ({
                                                    ...prev,
                                                    estado_id: null,
                                                }))}
                                            >
                                                Regresar a los estados
                                            </button>
                                        </div>
                                    )
                                }
                            </div>

                            {
                                loadingHeatmap ? (
                                    <LoaderStyled text="Cargando Matriz de datos" />
                                ) : (
                                    <HeatmapTable
                                        rows={heatmapEstados}
                                        level="estado"
                                        onRowClick={handleEstadoClick}
                                        onCellClick={handleCellClick}
                                    />
                                )
                            }


                        </div>
                    </section>

                    <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-gray-800">
                                Distribución por Sexo
                            </h2>

                            <SexoChart sexo={dataChart?.sexo} />
                        </div>

                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-gray-800">
                                Distribución por Grupo Etario
                            </h2>

                            <EdadChart grupoEtario={dataChart?.grupoEtario} />
                        </div>

                    </section>

                    <section className="mb-8">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-5">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Enfoque Diferenciado
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Distribución de registros por grupo de atención prioritaria.
                                </p>
                            </div>

                            <EnfoqueChart
                                enfoqueDiferenciado={dataChart?.enfoqueDiferenciado}
                            />
                        </div>
                    </section>
                </div >
            </div >
        </>
    );
}