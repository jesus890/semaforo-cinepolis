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

        <div>

            <ReactECharts
                option={option}
                style={{
                    height: "400px",
                }}
            />

        </div>
    );
}