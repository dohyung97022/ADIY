import React, { useContext } from "react";
import { GlobalContext } from "../index";
import { Bar, defaults, Chart } from "react-chartjs-2";

// props.yAxis = "true/false"

const BarChart = (props) => {
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
        // formatter: function (value, context) {
        //   return "fdsafdas";
        // },
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
          display: props.yAxis,
          gridLines: {
            display: false,
          },
          ticks: {
            maxTicksLimit: 5,
            min: 0,
            callback: function (value, index, values) {
              return value / 1e3 + "K";
            },
            // max: 6,
            //   stepSize: 1,
          },
        },
      ],
    },
  };
  return (
    <Bar
      data={{
        labels: chartStrData,
        datasets: [
          {
            label: "",
            data: chartIntData,
            backgroundColor: ["#3a7ddd", "#6859f3", "#e85c43", "#3eae4d", "#26e7a5"],
          },
        ],
      }}
      options={options}
    />
  );
};

export default BarChart;
