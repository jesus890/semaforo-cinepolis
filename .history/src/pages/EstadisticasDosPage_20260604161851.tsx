import { useEffect, useState } from "react";

import { GetTableCumplimiento } from "../services/dashboard.service";

export default function EstadisticasDosPage() {

    const [loadingTableCumplimiento, setLoadingTableCumplimiento] = useState<boolean>(true);

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

    return (

        <div className="p-8">

            <h1 className="text-4xl font-bold text-[#611232]">

                Estadísticas Secundarias

            </h1>

            <p className="mt-3 text-gray-500">

                Aquí irá el segundo dashboard.

            </p>

        </div>
    );
}