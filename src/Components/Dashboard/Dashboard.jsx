import React, { useContext, useEffect, useState } from "react";
import Sun from "../../Assets/sun.png";
import { LuUsers2 } from "react-icons/lu";
import Chart from "../Chart/LineChart";
import BarChart from "../Chart/BarChart";
import { IoMdAdd } from "react-icons/io";
import { FaArrowTrendDown } from "react-icons/fa6";
import { TbClockX } from "react-icons/tb";
import { RxStopwatch } from "react-icons/rx";
import { BiBookAdd } from "react-icons/bi";
import { BiBookContent } from "react-icons/bi";

import { IoMoonOutline } from "react-icons/io5";
import { LuCalendarClock } from "react-icons/lu";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import eDairyContext from "../../context/eDairyContext";
function Dashboard() {
  const context = useContext(eDairyContext);
  const { classes, sections, subjects, students, teachers, parents } = context;

  const [time, setTime] = useState(new Date());
  const now = new Date();

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    let formattedDate = date.toLocaleDateString("en-US", options);
    const day = date.getDate();
    let suffix = "th";
    if (day < 11 || day > 20) {
      switch (day % 10) {
        case 1:
          suffix = "st";
          break;
        case 2:
          suffix = "nd";
          break;
        case 3:
          suffix = "rd";
          break;
        default:
          break;
      }
    }

    return formattedDate.replace(/(\d+)(th)?/, `$1${suffix}`);
  };
  useEffect(() => {
    const timerID = setInterval(
      () => tick(),
      1000 // Update time every second
    );

    return () => {
      clearInterval(timerID); // Clear interval on component unmount
    };
  }, []);

  const tick = () => {
    setTime(new Date());
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-[#F1F2F6] dashboard">
      <div className="grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-1 gap-6 mb-10">
        <div className="grid gap-10 bg-white p-5 px-10 rounded-2xl">
          <div className="flex gap-3 items-center pt-5">
            <img src={Sun} alt=".." />
            <div>
              <p className="text-1xl text-[#C8CAD5]">{formatTime(time)}</p>
              <p className="text-[#C8CAD5] text-xs">Realtime Insight</p>
            </div>
          </div>
          <div>
            <p className="text-lg">Today:</p>
            <p className="text-lg">{formatDate(now)}</p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {}}
              className="bg-gradient-to-b from-[#8103CE] to-[#9F90FA] flex items-center justify-center py-2 text-white w-10/12 rounded-lg mb-4"
            >
              View Students
            </button>
          </div>
        </div>
        <div className="grid gap-5 ">
          <div
            className="bg-[#902dc8] text-white p-5 rounded-2xl h-full"
            onClick={() => {}}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-[38px] font-extralight">
                {students?.length}
              </h1>
              <div className="bg-white bg-opacity-40 p-2 h-fit rounded-full cursor-pointer">
                <LuUsers2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="mb-2"> Students</p>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white bg-opacity-20 text-white flex items-center justify-center rounded-full">
                <span>
                  <FaArrowTrendDown className="text-lg w-3 h-3 font-thin" />
                </span>
              </div>
              <span>10% Increase than Last month</span>
            </div>
          </div>
          <div className="bg-[#899E2B] text-white p-5 rounded-2xl h-full">
            <div className="flex justify-between items-center">
              <h1 className="text-[38px] font-extralight">{classes?.length}</h1>
              <div className="bg-white bg-opacity-40 p-2 h-fit rounded-full cursor-pointer">
                <BiBookContent className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="mb-2">Classes</p>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white bg-opacity-20 text-white flex items-center justify-center rounded-full">
                <span>
                  <IoMdAdd className="text-lg w-4 h-4 font-thin" />
                </span>
              </div>
              <span>{classes?.length} new Classes added!</span>
            </div>
          </div>
        </div>
        <div className="grid gap-5 ">
          <div
            className="bg-[#675bd8] text-white p-5 rounded-2xl h-full"
            onClick={() => {}}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-[38px] font-extralight">
                {teachers?.length}
              </h1>
              <div className="bg-white bg-opacity-40 p-2 h-fit rounded-full cursor-pointer">
                <LuUsers2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="mb-2">Teachers</p>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white bg-opacity-20 text-white flex items-center justify-center rounded-full">
                <span>
                  <IoMdAdd className="text-lg w-4 h-4 font-thin" />
                </span>
              </div>
              <span> {teachers?.length} new Teachers added!</span>
            </div>
          </div>
          <div
            className="bg-[#AA0000] text-white p-5 rounded-2xl h-full"
            onClick={() => {}}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-[38px] font-extralight">
                {sections?.length}
              </h1>
              <div className="bg-white bg-opacity-40 p-2 h-fit rounded-full cursor-pointer">
                <BiBookAdd className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="mb-2">Others</p>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white bg-opacity-20 text-white flex items-center justify-center rounded-full">
                <span>
                  <IoMdAdd className="text-lg w-4 h-4 font-thin" />
                </span>
              </div>
              <span> </span>
            </div>
          </div>
        </div>
        <div className="grid gap-5 ">
          <div
            className="bg-[#a8497b] text-white p-5 rounded-2xl h-full"
            onClick={() => {}}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-[38px] font-extralight">{parents?.length}</h1>
              <div className="bg-white bg-opacity-40 p-2 h-fit rounded-full cursor-pointer">
                <LuUsers2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="mb-2">Parents</p>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white bg-opacity-20 text-white flex items-center justify-center rounded-full">
                <span>
                  <IoMdAdd className="text-lg w-4 h-4 font-thin" />
                </span>
              </div>
              <span>{parents?.length} new Parents added!</span>
            </div>
          </div>
          <div className="bg-[#FA8F1E] text-white p-5 rounded-2xl h-full">
            <div className="flex justify-between items-center">
              <h1 className="text-[38px] font-extralight">
                {subjects?.length}
              </h1>
              <div className="bg-white bg-opacity-40 p-2 h-fit rounded-full cursor-pointer">
                <BiBookContent className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="mb-2"> Subjects</p>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white bg-opacity-20 text-white flex items-center justify-center rounded-full">
                <span>
                  <IoMdAdd className="text-lg w-4 h-4 font-thin" />
                </span>
              </div>
              <span> {subjects?.length} new Subjects added!</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 max-sm:flex-col max-md:grid-cols-1">
        <Chart />
        <BarChart />
      </div>
    </div>
  );
}
export default Dashboard;
