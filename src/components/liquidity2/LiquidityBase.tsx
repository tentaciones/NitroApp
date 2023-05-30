import React from "react";
import SuccessCard from "./SuccessCard";
import AddLiquidityModal from "./AddLiquidityModal";
import LiquidityBody from "./LiquidityBody";
import LiquidityTable from "./LiquidityTable";
import { useSuccessState } from "@/hooks/stores/successStore";
import {
  useAddLiquidityPreviewState,
  useCreatePositionPreviewState,
} from "@/hooks/stores/addLiquidityStore";
import RemoveLiquidityModal from "./RemoveLiquidityModal";
type Props = {};

const LiquidityBase = (props: Props) => {
  const { isPreviewPositionAdd, isPreviewPositionRemove }: any =
    useAddLiquidityPreviewState();
  const { isSuccessfull, setIsSuccessfull }: any = useSuccessState();
  return (
    <div className="mt-[180px] text-white  w-full ">
      <p className="text-2xl px-20">Liquidity Positions</p>
      <div className="flex gap-3 px-20">
        <LiquidityTable />
        <LiquidityBody />
      </div>
      {isPreviewPositionAdd && (
        <div className="absolute top-0 w-full h-screen">
          <AddLiquidityModal />
        </div>
      )}
      {isPreviewPositionRemove && (
        <div className="absolute top-0 w-full h-screen">
          <RemoveLiquidityModal />
        </div>
      )}

      {isSuccessfull && !isPreviewPositionAdd && (
        <div className="absolute top-0 w-full h-screen">
          <SuccessCard text="Liquidity added successfully" arbiscanLink="" />
        </div>
      )}
    </div>
  );
};

export default LiquidityBase;
