import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
type Props = {};

const SetPriceRange = (props: Props) => {
  const [lowerRangeInput, setLowerRangeInput] = useState(0);
  const [higherRangeInput, setHigherRangeInput] = useState(0);
  return (
    <div className="w-1/2">
      SetPriceRange
      <div className="h-1/2"></div>
      <div className="flex justify-between w-full gap-3">
        <div className="flex flex-col items-center  justify-between rounded-md border  border-[#383D48] w-1/2 h-20 py-2">
          <p className="font-thin text-[#9DA5B4] text-sm ">Max Price</p>
          <div className="flex justify-between ">
            <div
              className="flex items-center justify-center hover:cursor-pointer hover:bg-green-900 bg-[#091E33] rounded-full  h-5 w-5"
              onClick={() => {
                setLowerRangeInput(Number(lowerRangeInput) + 1);
              }}
            >
              <p className=" ">+</p>
            </div>
            <input
              type="number"
              className="outline-none bg-[#061727]  w-4/6 text-center"
              value={lowerRangeInput}
              onChange={(e: any) => setLowerRangeInput(e.target.value)}
            />
            <div
              className="flex items-center justify-center hover:cursor-pointer hover:bg-green-900 bg-[#091E33] rounded-full  h-5 w-5"
              onClick={() => {
                setLowerRangeInput(Number(lowerRangeInput) - 1);
              }}
            >
              <p className=" ">-</p>
            </div>
          </div>
          <p className="font-thin text-[#9DA5B4] text-sm ">USDT per ETH </p>
        </div>
        <div className="flex flex-col items-center  justify-between rounded-md border  border-[#383D48] w-1/2 h-20 py-2">
          <p className="font-thin text-[#9DA5B4] text-sm ">Max Price</p>
          <div className="flex justify-between ">
            <div
              className="flex items-center justify-center hover:cursor-pointer hover:bg-green-900 bg-[#091E33] rounded-full  h-5 w-5"
              onClick={() => {
                setHigherRangeInput(Number(higherRangeInput) + 1);
              }}
            >
              <p className=" ">+</p>
            </div>
            <input
              type="number"
              className="outline-none bg-[#061727]  w-4/6 text-center"
              value={higherRangeInput}
              onChange={(e: any) => setHigherRangeInput(e.target.value)}
            />
            <div
              className="flex items-center justify-center hover:cursor-pointer hover:bg-green-900 bg-[#091E33] rounded-full  h-5 w-5"
              onClick={() => {
                setHigherRangeInput(Number(higherRangeInput) - 1);
              }}
            >
              <p className=" ">-</p>
            </div>
          </div>
          <p className="font-thin text-[#9DA5B4] text-sm ">USDT per ETH </p>
        </div>
      </div>
      <button className="w-full h-10 border border-[#8690A2] mt-3 rounded-md">
        Full Range
      </button>
      <button className={`${styles.button} w-full mt-5`}>Preview</button>
    </div>
  );
};

export default SetPriceRange;
