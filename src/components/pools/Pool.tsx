import React, { useState } from "react";
import { MyPool } from ".";
import { AllPools } from ".";
import { BiPlus } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
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
              className={`md:block hidden             ${
                isAllPool && "text-[#00FDEE] "
              }`}
            >
              All Pools
            </p>
            <p
              className={`md:hidden             ${
                isAllPool && "text-[#00FDEE] "
              }`}
            >
              {" "}
              All
            </p>
          </div>
          <div
            className={`md:w-[100px] w-[50px] text-center h-[40px] flex items-center justify-center  text-[#B7BECD] border-[0.1px] rounded-r-[3px] border-[#03333D] hover:cursor-pointer ${
              !isAllPool && " bg-[#03333D]  border-none"
            }`}
            onClick={() => setAllPool(false)}
          >
            <p
              className={`md:block hidden             ${
                !isAllPool && "text-[#00FDEE] "
              }`}
            >
              My Pools
            </p>
            <p
              className={`md:hidden             ${
                !isAllPool && "text-[#00FDEE] "
              }`}
            >
              {" "}
              Mine
            </p>
          </div>
        </div>
        <div className="w-full relative flex items-center ">
          <input
            type="text"
            className="w-full h-[40px] rounded-md outline-none bg-background border border-[#E7E7E7] hover:border-[#00FDEE] focus:border-[#00FDEE]  px-8 placeholder:text-[#828282]"
            placeholder="search by name, address "
          />
          <CiSearch className="absolute mx-3 " />
        </div>

        <button className=" bg-gradient-to-r from-cyan-500 to-blue-500 px-[0.8px] py-[0.8px] rounded-md h-[40px] w-[280px] text-base">
          <div className="bg-background rounded-md h-full w-full flex items-center justify-center gap-2">
            <BiPlus className="md:block hidden" />
            <p className="text-base  md:block hidden"> Create New Pool</p>
            <p className=" text-sm md:hidden block "> New Pool</p>
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
