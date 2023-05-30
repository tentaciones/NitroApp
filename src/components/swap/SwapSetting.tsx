import React, { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
type Props = {};

const SwapSetting = (props: Props) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  return (
    <div
      className={`${
        isShowMore
          ? "h-[150px] absolute top-[50px]  w-[250px] bg-[#061727] border-[#646E82] border-[0.1px] rounded-md"
          : "absolute top-[50px] h-[120px] w-[250px] bg-[#061727] border-[#646E82] border-[0.1px] rounded-md"
      }`}
    >
      <div className="flex justify-between mt-5 px-2">
        <p className="text-sm">Auto Router API</p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="w-11 h-6 bg-[#8A93FF] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8A93FF] dark:peer-focus:ring-[#8A93FF] rounded-full peer dark:bg-[#8A93FF] peer-checked:after:translate-x-full peer-checked:after:border-[#061727] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#061727] after:border-[#061727] after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-[#061727] peer-checked:bg-[#8A93FF]"></div>
        </label>
      </div>
      <p className="text-[#9DA5B4] text-[10px] px-2 ">
        Use Nitro Finance to get quotes
      </p>
      <div className="border-[0.1px] border-[#B7BECD] px-2 mt-4"></div>
      <div className="flex justify-between px-2 items-center mt-3">
        <div className="flex gap-2 items-center text-sm">
          <p>Max Spillage</p>
          <AiOutlineQuestionCircle />
        </div>
        <div className="flex gap-1 items-center text-sm">
          <p>Auto</p>
          <IoIosArrowDown
            className="text-[#49536E] hover:cursor-pointer"
            onClick={() => setIsShowMore(!isShowMore)}
          />
        </div>
      </div>
      {isShowMore && (
        <div className="flex w-full px-2 mt-2">
          <div className="flex text-sm w-[70%]">
            <div
              className={`w-[60px] text-center h-[25px] flex items-center justify-center  text-[#B7BECD] border-[0.1px] rounded-l-[3px] border-[#21242C] hover:cursor-pointer ${
                isCustom && "bg-[#0B2741]  border-none"
              }`}
              onClick={() => setIsCustom(true)}
            >
              <p>Auto</p>
            </div>
            <div
              className={`w-[60px]  text-center h-[25px] flex items-center justify-center  text-[#B7BECD] border-[0.1px] rounded-r-[3px] border-[#21242C] hover:cursor-pointer ${
                !isCustom && " bg-[#0B2741]  border-none"
              }`}
              onClick={() => setIsCustom(false)}
            >
              <p>Custom</p>
            </div>
          </div>
          <div className="flex bg-[#091E33] w-[30%] rounded-md px-1 items-center">
            <input
              type="text"
              className="w-full outline-none bg-[#091E33] px-2 rounded-md text-sm "
            />
            <p className="text-sm">%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapSetting;
