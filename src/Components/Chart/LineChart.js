import { Radio, RadioGroup } from "@nextui-org/react";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { IoSettingsOutline } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
const FunctionalApexChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Students",
        data: [10, 20, 50, 30, 80, 50, 30, 80],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },

      stroke: {
        curve: "smooth",
      },
      colors: ["#8103CE"],
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  });
  const items = [
    {
      key: "1",
      label: (
        <RadioGroup label="" color="#8103CE" defaultValue="daily">
          <div className="flex gap-3">
            <Radio value="daily">Daily</Radio>
            <Radio value="weekly">Weekly</Radio>
            <Radio value="monthly">Monthly</Radio>
          </div>
        </RadioGroup>
      ),
    },
  ];
  return (
    <div className="bg-white rounded-2xl w-full" id="chart">
      <div className="flex justify-between px-5 pt-5 mb-5 items-center">
        <h1 className="text-lg">Students Graph</h1>
        <div className="flex gap-10 items-center">
          <RadioGroup label="" color="#8103CE" defaultValue="daily">
            <div className="flex gap-3 max-sm:hidden max-md:hidden">
              <Radio value="daily">This Year</Radio>
              <Radio value="monthly">Last Year</Radio>
            </div>
          </RadioGroup>

          <VscSettings className="text-2xl" />
        </div>
      </div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
        className="p-5"
      />
    </div>
  );
};

export default FunctionalApexChart;
