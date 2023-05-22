import React, { useState } from "react";
import { MyPool } from ".";
import { AllPools } from ".";
import { BiPlus } from "react-icons/bi";

type Props = {};

const Pool = (props: Props) => {
  const [isAllPool, setAllPool] = useState(true);
  return (
    <div className="px-20 w-screen mt-[200px] text-white">
      <p className="text-2xl font-bold ">Pools</p>
      <div className="flex gap-3 items-center mt-10">
        <div className="flex">
          <div
            className={`w-[100px] h-[40px] flex items-center justify-center  text-[#B7BECD] border-[0.1px] rounded-l-[3px] border-[#03333D] hover:cursor-pointer ${
              isAllPool && "bg-[#03333D] text-[#00FDEE] border-none"
            }`}
            onClick={() => setAllPool(true)}
          >
            <p>All Pools</p>
          </div>
          <div
            className={`w-[100px] h-[40px] flex items-center justify-center  text-[#B7BECD] border-[0.1px] rounded-r-[3px] border-[#03333D] hover:cursor-pointer ${
              !isAllPool && "bg-[#03333D] text-[#00FDEE] border-none"
            }`}
            onClick={() => setAllPool(false)}
          >
            <p>My Pools</p>
          </div>
        </div>

        <input
          type="text"
          className="w-full h-[40px] rounded-md outline-none bg-background border border-[#E7E7E7] hover:border-[#00FDEE] focus:border-[#00FDEE]  px-5 placeholder:text-[#828282]"
          placeholder="search by name, address"
        />
        <button className=" bg-gradient-to-r from-cyan-500 to-blue-500 px-[0.8px] py-[0.8px] rounded-md h-[40px] w-[280px] text-base">
          <div className="bg-background rounded-md h-full w-full flex items-center justify-center gap-2">
            <BiPlus />
            <p className=""> Create New Pool</p>
          </div>
        </button>
      </div>
      {isAllPool ? (
        <div className="px-5">
          <AllPools />
        </div>
      ) : (
        <div>
          <MyPool />
        </div>
      )}
    </div>
  );
};

export default Pool;