"use client";

import HeatmapTable from "./heatmap/HeatmapTable";
import HeatmapLegend from "./heatmap/HeatmapLegend";

import BackButton from "./navigation/BackButton";

import { useDashboard } from "../../hooks/useDashboard";
import SexoChart from "./charts/SexoChart";
import EdadChart from "./charts/EdadChart";
import EnfoqueChart from "./charts/EnfoqueChart";

export default function Dashboard() {

    const {
        level,
        tableData,
        selectedState,
        enterState,
        backToStates,
    } = useDashboard();

    return (

        <div className="min-h-screen bg-slate-50">

            <div className="mx-auto max-w-[1800px] p-6 lg:p-8">

                {/* HEADER */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-[#611232]">

                        Panel Estadístico
                    </h1>

                    <p className="mt-2 text-gray-500">

                        Visualización geoespacial y temporal de registros

                    </p>

                </div>

                {/* BREADCRUMB */}

                <div className="mb-6 flex flex-wrap items-center gap-3">

                    <span className="rounded-xl bg-[#611232]/10 px-4 py-2 text-sm font-medium text-[#611232]">

                        Estados

                    </span>

                    {
                        level === "municipio" &&
                        (
                            <>
                                <span className="text-gray-400">

                                    /

                                </span>

                                <span className="rounded-xl bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">

                                    {selectedState?.name}

                                </span>
                            </>
                        )
                    }

                </div>

                {/* BACK BUTTON */}

                {
                    level === "municipio" &&
                    (
                        <div className="mb-6">

                            <BackButton
                                onClick={
                                    backToStates
                                }
                            />

                        </div>
                    )
                }

                {/* MATRIZ */}

                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        <div>

                            <h2 className="text-xl font-bold text-gray-800">

                                {
                                    level === "estado"
                                        ? "Matriz de incidencia por estado"
                                        : `Matriz de incidencia por municipio`
                                }

                            </h2>

                            <p className="mt-1 text-sm text-gray-500">

                                {
                                    level === "estado"
                                        ? "Distribución temporal por entidad federativa"
                                        : `Distribución temporal para ${selectedState?.name}`
                                }

                            </p>

                        </div>

                        <HeatmapLegend />

                    </div>

                    <HeatmapTable
                        rows={tableData}
                        level={level}
                        onRowClick={
                            enterState
                        }
                    />

                </div>

                {/* CHARTS */}

                <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

                    {/* SEXO */}

                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                        <h3 className="mb-2 text-lg font-bold text-gray-800">

                            Distribución por sexo

                        </h3>

                        <p className="mb-4 text-sm text-gray-500">

                            Totales acumulados de los registros mostrados

                        </p>

                        <div className="flex h-[350px] items-center justify-center rounded-2xl border border-dashed border-gray-300">

                            <SexoChart />

                        </div>

                    </div>

                    {/* EDAD */}

                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                        <h3 className="mb-2 text-lg font-bold text-gray-800">

                            Distribución por edad

                        </h3>

                        <p className="mb-4 text-sm text-gray-500">

                            Menor de edad, mayor de edad y adulto mayor

                        </p>

                        <div className="flex h-[350px] items-center justify-center rounded-2xl border border-dashed border-gray-300">

                            <EdadChart />

                        </div>

                    </div>

                </div>

                {/* ENFOQUE */}

                <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h3 className="mb-2 text-lg font-bold text-gray-800">

                        Enfoque diferenciado

                    </h3>

                    <p className="mb-4 text-sm text-gray-500">

                        Clasificación de grupos prioritarios

                    </p>

                    <div className="flex items-center">

                        <EnfoqueChart />

                    </div>

                </div>

                {/* MAPA */}

                <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="mb-4">

                        <h3 className="text-lg font-bold text-gray-800">

                            Mapa interactivo

                        </h3>

                        <p className="mt-1 text-sm text-gray-500">

                            {
                                level === "estado"
                                    ? "Visualización nacional por entidad federativa"
                                    : `Zoom territorial para ${selectedState?.name}`
                            }

                        </p>

                    </div>

                    <div className="flex h-[650px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-slate-50">

                        <span className="text-sm text-gray-400">

                            MexicoMap.tsx

                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}