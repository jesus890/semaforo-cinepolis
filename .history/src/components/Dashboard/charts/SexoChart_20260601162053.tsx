import ReactECharts from "echarts-for-react";
import { Colors } from "../../constants/colors";

export default function SexoChart() {
    const option = {
        tooltip: {
            trigger: "item",
        },

        legend: {
            bottom: 0,
        },

        series: [
            {
                type: "pie",
                radius: ["45%", "75%"],

                data: [
                    {
                        value: 850,
                        name: "Hombre",
                        itemStyle: {
                            color: Colors.rojito,
                        },
                    },
                    {
                        value: 620,
                        name: "Mujer",
                        itemStyle: {
                            color: Colors.verdecito,
                        },
                    },
                    {
                        value: 120,
                        name: "Sin dato",
                        itemStyle: {
                            color: Colors.oro,
                        },
                    },
                ],
            },
        ],
    };

    return (
        <ReactECharts
            option={option}
            style={{ height: "400px" }}
        />
    );
}