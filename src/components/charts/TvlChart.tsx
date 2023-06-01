import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      backgroundColor: "#03333D",
      borderColor: "#00FDEE",
      tension: 0.1,
    },
  ],
};

const options = {
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false, // Hide the legend
    },
  },
};

const TvlChart = () => (
  <div className=" mt-[150px] w-full h-[300px] md:px-20 px-5 text-white">
    <p className="text-sm font-thin text-[#D7DEEA]">
      {"TVL(TOTAL VOLUME LOCKED)"}
    </p>
    <div className="flex items-center justify-between">
      <p className="text-3xl font-bold">$78.4K</p>
      <div className="flex items-center justify-center">
        <div className="hover:cursor-pointer hover:bg-[#00fdee0f] hover:text-[#00FDEE]   rounded-sm px-5 py-1">
          <p>D</p>
        </div>
        <div className="hover:cursor-pointer hover:bg-[#00fdee0f] hover:text-[#00FDEE]   rounded-sm px-5 py-1">
          <p>W</p>
        </div>
        <div className="hover:cursor-pointer hover:bg-[#00fdee0f] hover:text-[#00FDEE]   rounded-sm px-5 py-1">
          <p>M</p>
        </div>
      </div>
    </div>

    <Line data={data} options={options} />
  </div>
);

export default TvlChart;
