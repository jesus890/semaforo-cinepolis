import KPICard from "./KPICard";
import SexoChart from "./charts/SexoChart";
import EdadChart from "./charts/EdadChart";
import EnfoqueChart from "./charts/EnfoqueChart";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-slate-50">

            <div className="max-w-[1700px] mx-auto p-8">

                {/* Header */}

                <div className="mb-8">
                    <h1
                        className="
              text-4xl
              font-bold
              text-[#611232]
            "
                    >
                        Panel Estadístico
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Información General
                    </p>
                </div>

                {/* KPIs */}

                <div
                    className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-5
            mb-8
          "
                >
                    <KPICard
                        title="Total de Registros"
                        value={1590}
                    />

                    <KPICard
                        title="Hombres"
                        value={850}
                    />

                    <KPICard
                        title="Mujeres"
                        value={620}
                    />

                    <KPICard
                        title="Sin Dato"
                        value={120}
                    />
                </div>

                {/* Charts */}

                <div
                    className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
          "
                >
                    <div
                        className="
              bg-white
              rounded-2xl
              shadow-sm
              border
              border-gray-100
              p-6
            "
                    >
                        <h2
                            className="
                text-xl
                font-semibold
                text-[#611232]
                mb-4
              "
                        >
                            Distribución por Sexo
                        </h2>

                        <SexoChart />
                    </div>

                    <div
                        className="
              bg-white
              rounded-2xl
              shadow-sm
              border
              border-gray-100
              p-6
            "
                    >
                        <h2
                            className="
                text-xl
                font-semibold
                text-[#611232]
                mb-4
              "
                        >
                            Clasificación por Edad
                        </h2>

                        <EdadChart />
                    </div>
                </div>

                {/* Enfoque */}

                <div
                    className="
            mt-6
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-gray-100
            p-6
          "
                >
                    <h2
                        className="
              text-xl
              font-semibold
              text-[#611232]
              mb-4
            "
                    >
                        Enfoque Diferenciado
                    </h2>

                    <EnfoqueChart />
                </div>

            </div>
        </div>
    );
}