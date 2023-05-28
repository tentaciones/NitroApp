import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import SlideInput from "./SlideInput";
import {
  useCreatePositionPreviewState,
  useSuccessState,
} from "@/hooks/stores/addLiquidityStore";
type Props = {};

const SetPriceRange = (props: Props) => {
  const [lowerRangeInput, setLowerRangeInput] = useState(0);
  const [higherRangeInput, setHigherRangeInput] = useState(0);
  const { isPreviewPosition, setIsPreviewPosition }: any =
    useCreatePositionPreviewState();
  const { isSuccessfull, setIsSuccessfull }: any = useSuccessState();

  return (
    <div className="w-1/2">
      SetPriceRange
      <div className=" mt-10">
        <SlideInput />
      </div>
      <div className="flex justify-between w-full gap-3 mt-10">
        <div className="flex flex-col items-center  justify-between rounded-md border  border-[#383D48] w-1/2 h-[100px] py-2">
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
        <div className="flex flex-col items-center  justify-between rounded-md border  border-[#383D48] w-1/2 h-[100px] py-2">
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
      <button className="w-full h-10 border border-[#8690A2] mt-5 rounded-md">
        Full Range
      </button>
      <button
        className={`${styles.button} w-full mt-10`}
        onClick={() => {
          setIsSuccessfull(false);
          setIsPreviewPosition(true);
          console.log(isPreviewPosition, "preview");
          console.log(isSuccessfull, "success");
        }}
      >
        Preview
      </button>
    </div>
  );
};

export default SetPriceRange;
