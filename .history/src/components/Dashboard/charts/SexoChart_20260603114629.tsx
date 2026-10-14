import ReactECharts from "echarts-for-react";
import { Colors } from "../../../constants/colors";

interface Props {
    sexo?: {
        hombre: number;
        mujer: number;
        sin_dato: number;
    };
}

export default function SexoChart({ sexo }: Props) {

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

                label: {
                    formatter: "{b}\n{c}",
                },

                data: [
                    {
                        value: sexo?.hombre ?? 0,
                        name: "Hombre",
                        itemStyle: {
                            color: Colors.rojito,
                        },
                    },
                    {
                        value: sexo?.mujer ?? 0,
                        name: "Mujer",
                        itemStyle: {
                            color: Colors.verdecito,
                        },
                    },
                    {
                        value: sexo?.sin_dato ?? 0,
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
            style={{
                height: "400px",
            }}
        />
    );
}