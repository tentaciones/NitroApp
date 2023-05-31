import React, { useState } from "react";
import { MyPool } from ".";
import { AllPools } from ".";
import { BiPlus } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import AllPoolMobile from "./AllPoolMobile";
type Props = {};

const Pool = (props: Props) => {
  const [isAllPool, setAllPool] = useState(true);
  return (
    <div className="md:px-20 px-5 w-screen md:mt-[200px] mt-[400px] text-white">
      <p className="text-2xl font-bold ">Pools</p>
      <div className="flex gap-3 items-center mt-10">
        <div className="flex">
          <div
            className={`md:w-[100px] w-[50px] text-center h-[40px] flex items-center justify-center  text-[#B7BECD] border-[0.1px] rounded-l-[3px] border-[#03333D] hover:cursor-pointer ${
              isAllPool && "bg-[#03333D]  border-none"
            }`}
            onClick={() => setAllPool(true)}
          >
            <p
              className={`md:text-base text-[10px]             ${
                isAllPool && "text-[#00FDEE] "
              }`}
            >
              All Pools
            </p>
          </div>
          <div
            className={`md:w-[100px] w-[50px] text-center h-[40px] flex items-center justify-center  text-[#B7BECD] border-[0.1px] rounded-r-[3px] border-[#03333D] hover:cursor-pointer ${
              !isAllPool && " bg-[#03333D]  border-none"
            }`}
            onClick={() => setAllPool(false)}
          >
            <p
              className={`md:text-base text-[10px]              ${
                !isAllPool && "text-[#00FDEE] "
              }`}
            >
              My Pools
            </p>
          </div>
        </div>
        <div className="w-full  flex items-center ">
          <input
            type="text"
            className="w-full h-[40px] rounded-md outline-none bg-background border border-[#E7E7E7] hover:border-[#00FDEE] focus:border-[#00FDEE]  px-8 placeholder:text-[#828282] placeholder:font-[200]"
            placeholder="search by name, address "
          />
          <CiSearch className="absolute mx-3 " />
        </div>
      </div>
      {isAllPool ? (
        <div className="">
          <AllPools />
          <AllPoolMobile />
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
