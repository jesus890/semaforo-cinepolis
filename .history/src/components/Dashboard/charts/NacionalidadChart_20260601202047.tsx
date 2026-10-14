"use client";

import ReactECharts from "echarts-for-react";
import { Globe } from "lucide-react";

import { Colors } from "../../../constants/colors";

export default function NacionalidadChart() {

    const data = [
        {
            name: "Mexicana",
            value: 1420,
        },
        {
            name: "Estadounidense",
            value: 78,
        },
        {
            name: "Guatemalteca",
            value: 55,
        },
        {
            name: "Hondureña",
            value: 41,
        },
        {
            name: "Salvadoreña",
            value: 25,
        },
        {
            name: "Sin dato",
            value: 17,
        },
    ];

    const option = {

        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },

        grid: {
            top: 20,
            left: 130,
            right: 30,
            bottom: 20,
        },

        xAxis: {
            type: "value",
        },

        yAxis: {
            type: "category",

            data: data.map(
                item => item.name
            ),
        },

        series: [
            {
                type: "bar",

                barWidth: 28,

                data: data.map(
                    item => ({
                        value: item.value,
                        itemStyle: {
                            color:
                                item.name === "Mexicana"
                                    ? Colors.rojito
                                    : Colors.verdecito,
                            borderRadius: [0, 8, 8, 0],
                        },
                    })
                ),

                label: {
                    show: true,
                    position: "right",
                },
            },
        ],
    };

    return (

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h2 className="text-lg font-bold text-gray-800">
                        Nacionalidad
                    </h2>

                    <p className="text-sm text-gray-500">
                        Distribución por nacionalidad
                    </p>

                </div>

                <div className="rounded-2xl bg-[#611232]/10 p-3">

                    <Globe
                        size={24}
                        className="text-[#611232]"
                    />

                </div>

            </div>

            <ReactECharts
                option={option}
                style={{
                    height: "400px",
                }}
            />

        </div>
    );
}