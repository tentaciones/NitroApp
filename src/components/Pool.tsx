import React from "react";
import LineChart from "./LineChart";
import Pools from "./Pools";

type Props = {};

const Pool = (props: Props) => {
  return (
    <div className="px-20 w-screen mt-20 text-white">
      <div className="flex gap-3 items-center">
        <div className="w-32 h-[40px] flex items-center -center text-xl font-bold">
          <p>Pools</p>
        </div>

        <input
          type="text"
          className="w-full h-[40px] rounded-md outline-none bg-background border border-[#828282] hover:border-[#00FDEE] focus:border-[#00FDEE]  px-5 placeholder:text-[#828282]"
          placeholder="search by name, address"
        />
        <button className=" bg-gradient-to-r from-cyan-500 to-blue-500 px-[0.8px] py-[0.8px] rounded-md h-[40px] w-[180px]">
          <div className="bg-background rounded-md h-full w-full flex items-center justify-center">
            <p className=""> Create New Pool</p>
          </div>
        </button>
      </div>

      <div className="px-5">
        <Pools />
      </div>
    </div>
  );
};

export default Pool;
