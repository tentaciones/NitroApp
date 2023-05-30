import {
  useCreatePositionPreviewState,
  useCreatePositionState,
} from "@/hooks/stores/addLiquidityStore";
import { useSuccessState } from "@/hooks/stores/successStore";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { SuccessCard } from "../success";
import AddLiquidityModal from "./AddLiquidityModal";
import SelectPair from "./SelectPair";
import SetPriceRange from "./SetPriceRange";
type Props = {};

const AddLiquidity = (props: Props) => {
  const { setIsCreateNewPosition }: any = useCreatePositionState();
  const { isPreviewPosition }: any = useCreatePositionPreviewState();
  const { isSuccessfull, setIsSuccessfull }: any = useSuccessState();
  return (
    <div className="w-full ">
      <div className="px-[150px]">
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
      {isPreviewPosition && (
        <div className="absolute top-0 w-full h-screen">
          <AddLiquidityModal />
        </div>
      )}
      {isSuccessfull && !isPreviewPosition && (
        <div className="absolute top-0 w-full h-screen">
          <SuccessCard text="Liquidity added successfully" arbiscanLink="" />
        </div>
      )}
    </div>
  );
};

export default AddLiquidity;
