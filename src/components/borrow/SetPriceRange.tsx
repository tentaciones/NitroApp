import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import SlideInput from "./SlideInput";
import {
  useAddLiquidityPreviewState,
  useLiquidyState,
} from "@/hooks/stores/addLiquidityStore";
import { useSuccessState } from "@/hooks/stores/successStore";
import { useBorrowState } from "@/hooks/stores/borrowstores";
import { useSelectedTokenstate } from "@/hooks/stores/tokenStore";
type Props = {};

const SetPriceRange = (props: Props) => {
  const [lowerRangeInput, setLowerRangeInput] = useState(0);
  const [higherRangeInput, setHigherRangeInput] = useState(0);
  const { isPreview, setIsPreview }: any = useBorrowState();
  const [isBelowPriceRange, setIsBelowPriceRange] = useState(false);

  const { isSuccessfull, setIsSuccessfull }: any = useSuccessState();
  const { isAddLiquidity }: any = useLiquidyState();
  const {
    selectedTokenX,

    selectedTokenY,
  }: any = useSelectedTokenstate();

  return (
    <div className="w-full md:px-5 mt-5">
      {isAddLiquidity && (
        <>
          <div className="flex justify-between">
            <p>SetPriceRange</p>
            <div className="flex gap-2 items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onClick={() => setIsBelowPriceRange(!isBelowPriceRange)}
                />
                <div className="w-11 h-6 bg-[#00FDEE] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00FDEE] dark:peer-focus:ring-[#00FDEE] rounded-full peer dark:bg-[#00FDEE] peer-checked:after:translate-x-full peer-checked:after:border-[#045651] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#045651] after:border-[#045651] after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-[#045651] peer-checked:bg-[#00FDEE]"></div>
              </label>
              {isBelowPriceRange ? (
                <p className="text-sm text-[#D7DEEA]">Below Price</p>
              ) : (
                <p className="text-sm text-[#D7DEEA]">Above Price</p>
              )}
            </div>
          </div>
          <div className="text-sm text-[#D7DEEA] flex gap-3 justify-center mt-5">
            <p> Current Price:</p>
            <p>0.0113165</p>
            <p>
              {selectedTokenX.name} per {selectedTokenY.name}
            </p>
          </div>

          <div className=" mt-5">
            <SlideInput />
          </div>

          <div className="flex justify-between w-full gap-3 mt-10">
            <div className="flex flex-col items-center  justify-between rounded-md border  border-[#383D48] w-1/2 h-[100px] py-2">
              <p className="font-thin text-[#9DA5B4] text-sm ">Max Price</p>
              <div className="flex justify-between px-5">
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
              <div className="flex justify-between px-5">
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
        </>
      )}
      {isAddLiquidity && (
        <button className="w-full h-10 border border-[#8690A2] mt-5 rounded-md">
          Full Range
        </button>
      )}

      <button
        className={`${styles.button} w-full mt-10`}
        onClick={() => {
          setIsSuccessfull(false);
          setIsPreview(true);
        }}
      >
        Preview
      </button>
    </div>
  );
};

export default SetPriceRange;
