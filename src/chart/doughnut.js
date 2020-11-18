import React from "react";
import { Doughnut, defaults, Chart } from "react-chartjs-2";

const doughnutChart = () => {
  
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
    labels: ["좋아요", "싫어요", "댓글", "유령"],
    datasets: [
      {
        label: "",
        data: [3, 5, 5, 3],

        backgroundColor: ["#3a7ddd", "#6859f3", "#e85c43"],
      },
    ],
  };
  const options = {
    // rotation: 1 * 3.14,
    // circumference: 1 * 3.14,
    maintainAspectRatio: false,
    title: {
      display: false,
      text: "Doughnut Chart",
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
    // events: [""],
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
          if (context.dataIndex === 3) {
            return "";
          }
          return value + "%";
        },
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
  };
  return <Doughnut data={data} options={options} />;
};

export default doughnutChart;
