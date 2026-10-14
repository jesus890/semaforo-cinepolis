import ReactECharts from "echarts-for-react";
import { Colors } from "../../../constants/colors";

interface SexoItem {
    categoria: string;
    total: number;
}

interface Props {
    sexo?: SexoItem[];
}

export default function SexoChart({
    sexo = [],
}: Props) {

    const getColor = (categoria: string) => {

        switch (categoria.toUpperCase()) {

            case "HOMBRE":
                return Colors.rojito;

            case "MUJER":
                return Colors.verdecito;

            default:
                return Colors.oro;
        }
    };

    const data = sexo.map(item => ({
        value: item.total,
        name:
            item.categoria.charAt(0) +
            item.categoria.slice(1).toLowerCase(),

        itemStyle: {
            color: getColor(item.categoria),
        },
    }));

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

                data,
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