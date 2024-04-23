import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { VscSettings } from "react-icons/vsc";
import eDairyContext from "../../context/eDairyContext";

const FunctionalApexChart = () => {
  const context = useContext(eDairyContext);
  const { teachers } = context;

  // Convert level counts to series data format
  const seriesData = [
    {
      data: Object.values(teachers?.length ? teachers[0] : {}),
    },
  ];

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
      },
    },
    options: {
      colors: ["#8103CE"],
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: Object.values(teachers?.length ? teachers[0] : {}),
    },
    colors: ["#8103CE"],
  };

  return (
    <div
      className="bg-white max-sm:w-full max-md:w-full rounded-2xl p-5"
      id="chart"
    >
      <div className="flex justify-between px-5 pt-5 mb-5 items-center">
        <h1 className="text-lg max-sm:text-base max-md:text-base">
          Teachers Chart
        </h1>
        <div className="flex gap-10 items-center">
          <VscSettings className="text-2xl" />
        </div>
      </div>
      <ReactApexChart
        options={chartOptions}
        series={seriesData}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default FunctionalApexChart;
