import { useLiquidyState } from "@/hooks/stores/addLiquidityStore";
import Image from "next/image";
import React, { useState } from "react";

import SelectPair from "./SelectPair";
import SetPriceRange from "./SetPriceRange";
type SetIsAddLiquidity = (value: boolean) => void;
type UseLiquidyState = {
  isAddLiquidity: boolean;
  setIsAddLiquidity: SetIsAddLiquidity;
};

const LiquidityBody = () => {
  const { isAddLiquidity, setIsAddLiquidity }: UseLiquidyState =
    useLiquidyState() as UseLiquidyState;
  return (
    <div className="w-[40%] h-[950px] bg-[#061727] mt-10 rounded-2xl overflow-y-scroll">
      <div className="px-5">
        <div className="rounded-2xl h-[60px] border-[1px] border-[#21242C] mt-10 flex p-2 ">
          <div
            className={`w-1/2  flex items-center justify-center  rounded-xl     hover:cursor-pointer ${
              isAddLiquidity && "bg-[#0B2741]  "
            }`}
            onClick={() => setIsAddLiquidity(true)}
          >
            <p>Add Liquidity</p>
          </div>
          <div
            className={`w-1/2  flex items-center justify-center  rounded-xl     hover:cursor-pointer ${
              !isAddLiquidity && "bg-[#0B2741]  "
            }`}
            onClick={() => setIsAddLiquidity(false)}
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
