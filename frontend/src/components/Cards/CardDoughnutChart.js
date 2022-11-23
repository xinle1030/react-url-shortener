import React from "react";
import Chart from "chart.js";

export default function CardDoughnutChart() {
  const getRandomColor = (length) => {
    let colors = [];

    for (let i = 0; i < length; i++) {
      colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
    }

    return colors;
  };

  React.useEffect(() => {
    let ignore = false;

    if (!ignore) {
      let dataColors = getRandomColor(3);

      var config = {
        type: "doughnut",
        data: {
          labels: ["Red", "Yellow", "Blue"],
          datasets: [
            {
              backgroundColor: dataColors,
              data: [10, 20, 30],
              fill: false,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Locations Charts",
            fontColor: "white",
          },
          legend: {
            labels: {
              fontColor: "white",
            },
            align: "end",
            position: "bottom",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
        },
      };
      var ctx = document.getElementById("doughnut-chart").getContext("2d");
      window.myLine = new Chart(ctx, config);
    }
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">Locations</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="doughnut-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
