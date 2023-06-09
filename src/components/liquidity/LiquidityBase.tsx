import React from "react";
import SuccessCard from "./SuccessCard";
import AddLiquidityModal from "./AddLiquidityModal";
import LiquidityBody from "./LiquidityBody";
import LiquidityTable from "./LiquidityTable";
import { useSuccessState } from "@/hooks/stores/successStore";
import {
  useAddLiquidityPreviewState,
  useLiquidityTxnHashState,
  useCreatePositionPreviewState,
} from "@/hooks/stores/addLiquidityStore";
import RemoveLiquidityModal from "./RemoveLiquidityModal";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import {
  TAddLiquidityPreviewState,
  TLiquidityTxnHashState,
  TSuccessState,
} from "../helper/types";
type Props = {};

const LiquidityBase = (props: Props) => {
  const { isPreviewPositionAdd, isPreviewPositionRemove } =
    useAddLiquidityPreviewState() as TAddLiquidityPreviewState;

  const { LiquidityTxnHash } =
    useLiquidityTxnHashState() as TLiquidityTxnHashState;
  const { isSuccessfull, setIsSuccessfull } =
    useSuccessState() as TSuccessState;
  const router = useRouter();
  return (
    <div className="md:mt-[180px] mt-[100px] text-white  w-full  ">
      <p className="text-2xl px-20 md:block hidden">Liquidity Positions</p>
      <div className="flex gap-2 text-[#D7DEEA] items-center px-5 md:hidden">
        <BsArrowLeft onClick={() => router.push("/liquidityPostions")} />
        <p>Back</p>
      </div>
      {!isPreviewPositionAdd && !isPreviewPositionRemove && !isSuccessfull && (
        <div className="flex  gap-3 md:px-20 px-5 ">
          <LiquidityTable />
          <LiquidityBody />
        </div>
      )}

      {isPreviewPositionAdd && (
        <div className="absolute top-0 w-full h-screen ">
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
          <SuccessCard
            text=""
            arbiscanLink={`https://testnet.arbiscan.io/tx/${LiquidityTxnHash}`}
          />
        </div>
      )}
    </div>
  );
};

export default LiquidityBase;
