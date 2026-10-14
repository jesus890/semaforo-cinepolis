import { useMemo, useState } from "react";

import type { DashboardLevel, HeatmapRow } from "../types/dashboard.types";

import {estadosMock,municipiosMock} from "../data/mockData";

export function useDashboard() {

    const [
        level,
        setLevel,
    ] = useState<DashboardLevel>(
        "estado"
    );

    const [
        selectedState,
        setSelectedState,
    ] = useState<HeatmapRow | null>(
        null
    );

    const tableData = useMemo(() => {

        if (
            level === "estado"
        ) {
            return estadosMock;
        }

        const municipioInfo =
            municipiosMock.find(
                item =>
                    item.estadoId ===
                    selectedState?.id
            );

        return (
            municipioInfo?.municipios ||
            []
        );

    }, [
        level,
        selectedState,
    ]);

    const enterState = (
        state: HeatmapRow
    ) => {

        setSelectedState(state);

        setLevel(
            "municipio"
        );
    };

    const backToStates =
        () => {

            setLevel(
                "estado"
            );

            setSelectedState(
                null
            );
        };

    return {

        level,

        tableData,

        selectedState,

        enterState,

        backToStates,
    };
}