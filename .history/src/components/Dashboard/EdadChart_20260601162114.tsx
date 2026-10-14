import ReactECharts from "echarts-for-react";
import { Colors } from "../../constants/colors";

export default function EdadChart() {
  const option = {
    tooltip: {
      trigger: "axis",
    },

    xAxis: {
      type: "category",
      data: [
        "Menor de edad",
        "Mayor de edad",
        "Adulto mayor",
      ],
    },

    yAxis: {
      type: "value",
    },

    series: [
      {
        type: "bar",
        barWidth: 70,

        data: [
          {
            value: 250,
            itemStyle: {
              color: Colors.verdecito,
            },
          },
          {
            value: 1100,
            itemStyle: {
              color: Colors.rojito,
            },
          },
          {
            value: 140,
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