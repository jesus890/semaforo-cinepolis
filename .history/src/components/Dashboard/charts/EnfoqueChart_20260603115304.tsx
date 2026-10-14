import ReactECharts from "echarts-for-react";
import { Colors } from "../../../constants/colors";

interface EnfoqueDetalle {
  categoria: string;
  total: number;
}

interface EnfoqueItem {
  grupo: string;
  detalle: EnfoqueDetalle[];
}

interface Props {
  enfoqueDiferenciado?: EnfoqueItem[];
}

export default function EnfoqueChart({
  enfoqueDiferenciado = [],
}: Props) {

  const normalize = (
    value: string
  ) => {

    const v =
      value
        ?.trim()
        .toUpperCase();

    if (v === "SI")
      return "SI";

    if (v === "NO")
      return "NO";

    return "SIN DATO";
  };

  const groups =
    enfoqueDiferenciado.map(
      item => {

        switch (
        item.grupo
        ) {

          case "TIENEDISCAPACIDAD":
            return "Discapacidad";

          case "HABLAESPANIOL":
            return "Habla Español";

          case "LENGUA":
            return "Lengua";

          case "ESMIGRANTE":
            return "Migrante";

          default:
            return item.grupo;
        }
      }
    );

  const siData =
    enfoqueDiferenciado.map(
      grupo =>
        grupo.detalle
          .filter(
            x =>
              normalize(
                x.categoria
              ) === "SI"
          )
          .reduce(
            (
              acc,
              item
            ) =>
              acc +
              item.total,
            0
          )
    );

  const noData =
    enfoqueDiferenciado.map(
      grupo =>
        grupo.detalle
          .filter(
            x =>
              normalize(
                x.categoria
              ) === "NO"
          )
          .reduce(
            (
              acc,
              item
            ) =>
              acc +
              item.total,
            0
          )
    );

  const sinDatoData =
    enfoqueDiferenciado.map(
      grupo =>
        grupo.detalle
          .filter(
            x =>
              normalize(
                x.categoria
              ) ===
              "SIN DATO"
          )
          .reduce(
            (
              acc,
              item
            ) =>
              acc +
              item.total,
            0
          )
    );

  const option = {

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },

    legend: {
      bottom: 0,
    },

    grid: {
      left: 150,
      right: 30,
      top: 30,
      bottom: 60,
    },

    xAxis: {
      type: "value",
    },

    yAxis: {
      type: "category",
      data: groups,
    },

    series: [
      {
        name: "Sí",
        type: "bar",
        stack: "total",

        label: {
          show: true,
        },

        itemStyle: {
          color:
            Colors.verdecito,
        },

        data: siData,
      },

      {
        name: "No",
        type: "bar",
        stack: "total",

        label: {
          show: true,
        },

        itemStyle: {
          color:
            Colors.rojito,
        },

        data: noData,
      },

      {
        name: "Sin dato",
        type: "bar",
        stack: "total",

        label: {
          show: true,
        },

        itemStyle: {
          color:
            Colors.oro,
        },

        data: sinDatoData,
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{
        height: "500px",
      }}
    />
  );
}