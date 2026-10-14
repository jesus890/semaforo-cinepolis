import ReactECharts from "echarts-for-react";
import { Colors } from "../../../constants/colors";

interface GrupoEtarioItem {
  categoria: string;
  total: number;
}

interface Props {
  grupoEtario?: GrupoEtarioItem[];
}

export default function EdadChart({
  grupoEtario = [],
}: Props) {

  const getColor = (
    categoria: string
  ) => {

    switch (
    categoria.toUpperCase()
    ) {

      case "MENOR DE EDAD":
        return Colors.verdecito;

      case "MAYOR DE EDAD":
        return Colors.rojito;

      case "ADULTO MAYOR":
        return Colors.oro;

      default:
        return "#4F46E5";
    }
  };

  const categories =
    grupoEtario.map(
      item => item.categoria
    );

  const data =
    grupoEtario.map(
      item => ({
        value: item.total,

        itemStyle: {
          color: getColor(
            item.categoria
          ),
        },
      })
    );

  const option = {
    tooltip: {
      trigger: "axis",
    },

    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      containLabel: true,
    },

    xAxis: {
      type: "category",

      data: categories,

      axisLabel: {
        interval: 0,
        rotate: 0,
      },
    },

    yAxis: {
      type: "value",
    },

    series: [
      {
        type: "bar",

        barWidth: 70,

        borderRadius: [
          8,
          8,
          0,
          0,
        ],

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