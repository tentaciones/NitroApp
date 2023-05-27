import { useCreatePositionState } from "@/hooks/stores/createNewPositionState";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import SelectPair from "./SelectPair";
import SetPriceRange from "./SetPriceRange";
type Props = {};

const AddLiquidity = (props: Props) => {
  const { setIsCreateNewPosition }: any = useCreatePositionState();
  return (
    <div className="w-full ">
      <div className="h-[600px] w-full bg-[#061727] rounded-xl">
        <div className="flex justify-between  pt-10 px-10">
          <FiArrowLeft
            className="font-bold text-3xl hover:cursor-pointer"
            onClick={() => setIsCreateNewPosition(false)}
          />
          <p className="text-xl font-bold">Add Liquidity</p>
          <div></div>
        </div>
        <div className="bg-[#21242C] w-full h-[1px] mt-5"></div>
        <div className="flex justify-between w-full pt-10 px-10 gap-20">
          <SelectPair />
          <SetPriceRange />
        </div>
      </div>
    </div>
  );
};

export default AddLiquidity;
