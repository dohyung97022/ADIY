import React, { useContext } from "react";
import { GlobalContext } from "../index";
import { Pie, defaults, Chart } from "react-chartjs-2";

const PieChart = () => {
  const { chartIntData, chartStrData } = useContext(GlobalContext);

  var chartFontPercent = 0.13;
  var minChartFontSize = 15;
  defaults.global.defaultFontStyle = 400;
  defaults.global.defaultFontColor = "#a9a9a9";
  var dataLabelFontColor = "#ffffff";

  Chart.pluginService.register({
    beforeDraw: function (c) {
      var chartHeight = c.chart.height;
      var size = chartHeight * chartFontPercent;
      if (size > minChartFontSize) {
        size = minChartFontSize;
      }
      defaults.global.defaultFontSize = size;
    },
  });
  const data = {
    labels: ["", "", "", "", ""],
    datasets: [
      {
        label: "",
        data: [3, 5, 5, 3, 19],
        // borderColor: ["#ff0303", "#03c8ff"],
        backgroundColor: ["#3a7ddd", "#6859f3", "#e85c43", "#3eae4d", "#26e7a5"],
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    // responsive: true,
    title: {
      display: false,
    },
    tootip: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      xAxes: [
        {
          display: false,
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
    plugins: {
      datalabels: {
        // align: "end",
        anchor: "center",
        color: dataLabelFontColor,
        font: function (c) {
          var chartHeight = c.chart.height;
          var size = chartHeight * chartFontPercent;
          if (size > minChartFontSize) {
            size = minChartFontSize;
          }
          return {
            size: size,
          };
        },
        formatter: function (value, context) {
          return chartStrData[context.dataIndex];
        },
      },
    },
  };
  return (
    <Pie
      data={{
        labels: chartStrData,
        datasets: [
          {
            label: "",
            data: chartIntData,
            // borderColor: ["#ff0303", "#03c8ff"],
            backgroundColor: ["#3a7ddd", "#6859f3", "#e85c43", "#3eae4d", "#26e7a5"],
          },
        ],
      }}
      options={options}
    />
  );
};

export default PieChart;
