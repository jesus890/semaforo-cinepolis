import { useEffect, useState } from "react";

import { GetTableCumplimiento } from "../services/dashboard.service";
import CumplimientoTable from "../components/Dashboard/Tables/CumplimientoTable";
import LoaderStyled from "../components/Dashboard/Loader/Loader";

export default function EstadisticasDosPage() {

    const [loadingTableCumplimiento, setLoadingTableCumplimiento] = useState<boolean>(true);

    const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);
    const [dataCumplimiento, setDataCumplimiento] = useState<any>(null);

    useEffect(() => {
        loadTableCumplimiento();
    }, []);

    const loadTableCumplimiento = async (estado?: string) => {
        try {

            setLoadingTableCumplimiento(true);

            const response = await GetTableCumplimiento(estado);
            setDataCumplimiento(response);

        } catch (error) {
            console.log("No se pudo obtener la información de tabla de cumplimiento");
        } finally {
            setLoadingTableCumplimiento(false);
        }
    }

    const handleEstadoClick = (estado: string) => {

        console.log(
            "Estado seleccionado:",
            estado
        );
        setDataCumplimiento(estado);
        loadTableCumplimiento(estado);
    };

    return (

        <div className="p-8">

            <div className="mb-8">

                <div className="flex items-center justify-between">

                    <div>

                        <div className="mb-2 inline-flex items-center rounded-full bg-[#611232]/10 px-4 py-1 text-sm font-medium text-[#611232]">
                            Seguimiento Nacional
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-[#611232]">
                            Cumplimiento de Alertamiento
                        </h1>

                        <p className="mt-3 max-w-3xl text-sm text-slate-600">
                            Monitoreo institucional del cumplimiento de los procesos
                            de alertamiento, localización y clasificación de registros
                            a nivel nacional.
                        </p>

                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">

                        <div className="text-xs uppercase tracking-wide text-slate-500">
                            Última actualización
                        </div>

                        <div className="mt-1 font-semibold text-slate-800">
                            {new Date().toLocaleDateString("es-MX")}
                        </div>

                    </div>

                </div>

            </div>

            {
                loadingTableCumplimiento ? (
                    <LoaderStyled text="Cargando Tabla de cumplimiento" />
                ) : (
                    <>
                        {estadoSeleccionado && (

                            <div className="mb-6">

                                <div className="inline-flex items-center gap-3 rounded-2xl border border-[#BC955B] bg-[#BC955B]/10 px-5 py-3">

                                    <span className="font-medium text-[#611232]">
                                        Estado seleccionado:
                                    </span>

                                    <span className="font-bold text-slate-800">
                                        {estadoSeleccionado}
                                    </span>

                                    <button
                                        onClick={() => {
                                            setEstadoSeleccionado(null);
                                            loadTableCumplimiento();
                                        }}
                                        className="text-sm font-semibold text-[#611232]"
                                    >
                                        Limpiar filtro
                                    </button>

                                </div>

                            </div>

                        )}

                        <CumplimientoTable rows={dataCumplimiento} /* onEstadoClick={handleEstadoClick} */ />
                    </>

                )
            }



        </div>
    );
}