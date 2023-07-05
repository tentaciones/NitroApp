import {
  useAddLiquidityInputState,
  useLiquidyState,
} from "@/hooks/stores/addLiquidityStore";
import Image from "next/image";
import React, { useState } from "react";
import { TAddLiquidityInputState, UseLiquidyState } from "../helper/types";
import { SelectPair } from "../pair";

import SetPriceRange from "./SetPriceRange";

const LiquidityBody = () => {
  const { isAddLiquidity, setIsAddLiquidity } =
    useLiquidyState() as UseLiquidyState;
  const { setTokenXAmount, setTokenYAmount } =
    useAddLiquidityInputState() as TAddLiquidityInputState;
  return (
    <div
      className={`${
        isAddLiquidity
          ? "h-[950px] md:w-[40%] w-full  md:bg-[#061727] md:mt-20 mt-10 rounded-2xl overflow-y-scroll  "
          : "h-[750px] md:w-[40%] w-full  md:bg-[#061727] md:mt-20 mt-10 rounded-2xl overflow-y-scroll"
      }`}
    >
      <div className="md:px-5">
        <div className="rounded-2xl h-[60px] border-[1px] border-[#21242C] mt-10 flex p-2 ">
          <div
            className={`w-1/2  flex items-center justify-center  rounded-xl     hover:cursor-pointer ${
              isAddLiquidity && "bg-[#0B2741]  "
            }`}
            onClick={() => {
              setTokenYAmount("");
              setTokenXAmount("");
              setIsAddLiquidity(true);
            }}
          >
            <p>Add Liquidity</p>
          </div>
          <div
            className={`w-1/2  flex items-center justify-center  rounded-xl     hover:cursor-pointer ${
              !isAddLiquidity && "bg-[#0B2741]  "
            }`}
            onClick={() => {
              setTokenYAmount("");
              setTokenXAmount("");
              setIsAddLiquidity(false);
            }}
          >
            <p>Remove Liquidity</p>
          </div>
        </div>
      </div>
      <div className="w-full border-[0.5px] border-[#21242C] mt-5"></div>

      <SelectPair />

      <SetPriceRange />
    </div>
  );
};

export default LiquidityBody;
