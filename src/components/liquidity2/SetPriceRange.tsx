import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import SlideInput from "./SlideInput";
import {
  useAddLiquidityPreviewState,
  useLiquidyState,
} from "@/hooks/stores/addLiquidityStore";
import { useSuccessState } from "@/hooks/stores/successStore";
type Props = {};

const SetPriceRange = (props: Props) => {
  const [lowerRangeInput, setLowerRangeInput] = useState(0);
  const [higherRangeInput, setHigherRangeInput] = useState(0);
  const {
    isPreviewPositionAdd,
    setIsPreviewPositionAdd,
    setIsPreviewPositionRemove,
  }: any = useAddLiquidityPreviewState();

  const { isSuccessfull, setIsSuccessfull }: any = useSuccessState();
  const { isAddLiquidity }: any = useLiquidyState();

  return (
    <div className="w-full px-5 mt-5">
      {isAddLiquidity && (
        <>
          <p>SetPriceRange</p>
          <div className=" mt-5">
            <SlideInput />
          </div>
        </>
      )}
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
      {isAddLiquidity && (
        <button className="w-full h-10 border border-[#8690A2] mt-5 rounded-md">
          Full Range
        </button>
      )}

      <button
        className={`${styles.button} w-full mt-10`}
        onClick={() => {
          if (isAddLiquidity) {
            setIsSuccessfull(false);
            setIsPreviewPositionAdd(true);
          } else {
            setIsSuccessfull(false);
            setIsPreviewPositionRemove(true);
          }
        }}
      >
        Preview
      </button>
    </div>
  );
};

export default SetPriceRange;
