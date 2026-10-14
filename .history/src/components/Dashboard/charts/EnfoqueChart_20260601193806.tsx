import ReactECharts from "echarts-for-react";
import { Colors } from "../../../constants/colors";

export default function EnfoqueChart() {
  const option = {
    tooltip: {
      trigger: "axis",
    },

    grid: {
      left: 120,
      right: 30,
      top: 20,
      bottom: 20,
    },

    xAxis: {
      type: "value",
    },

    yAxis: {
      type: "category",
      data: [
        "Indígena",
        "Migrante",
        "LGBTIQ+",
        "Discapacidad",
        "Afrodescendiente",
      ],
    },

    series: [
      {
        type: "bar",

        data: [
          {
            value: 180,
            itemStyle: {
              color: Colors.rojito,
            },
          },
          {
            value: 90,
            itemStyle: {
              color: Colors.verdecito,
            },
          },
          {
            value: 40,
            itemStyle: {
              color: Colors.oro,
            },
          },
          {
            value: 65,
            itemStyle: {
              color: Colors.grisote,
            },
          },
          {
            value: 28,
            itemStyle: {
              color: "#8D8D8D",
            },
          },
        ],
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "450px" }}
    />
  );
}