import {
  useCreatePositionPreviewState,
  useCreatePositionState,
} from "@/hooks/stores/addLiquidityStore";
import { useSuccessState } from "@/hooks/stores/successStore";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";

import AddLiquidityModal from "../liquidity/AddLiquidityModal";

import BorrowModal from "./BorrowModal";
import { SelectPair } from "../pair";

import { useRouter } from "next/router";
import SetPriceRange from "./SetPriceRange";
import { useBorrowState } from "@/hooks/stores/borrowstores";
import SuccessCard from "./SuccessCard";
type Props = {};

const BorrowBase = (props: Props) => {
  const { isPreview, setIsPreview }: any = useBorrowState();
  const { isSuccessfull, setIsSuccessfull }: any = useSuccessState();
  const router = useRouter();
  return (
    <div className="w-full text-white md:mt-[180px] mt-[100px] mb-32 md:mb-0">
      <div className="md:px-[150px]">
        <div className="md:h-[600px]  w-full md:bg-[#061727] rounded-xl overflow-y-scroll">
          <div className="flex justify-between  pt-10 px-10">
            <BsArrowLeft
              className="font-bold text-3xl hover:cursor-pointer text-[#D7DEEA]"
              onClick={() => router.push("/swap")}
            />
            <p className="text-xl font-bold">Borrow</p>
            <div></div>
          </div>
          <div className="bg-[#21242C] w-full h-[1px] mt-5"></div>
          <div className="flex md:flex-row flex-col justify-between w-full pt-10 md:px-10 px-5 gap-20">
            <div className="md:w-1/2 w-full">
              <SelectPair />
            </div>
            <div className="md:w-1/2 w-full">
              <SetPriceRange />
            </div>
          </div>
        </div>
      </div>
      {isPreview && (
        <div className="absolute top-0 w-full h-screen">
          <BorrowModal />
        </div>
      )}
      {isSuccessfull && !isPreview && (
        <div className="absolute top-0 w-full h-screen">
          <SuccessCard
            text="Borrowed 0.003 EtH/USDt liquidity"
            arbiscanLink=""
          />
        </div>
      )}
    </div>
  );
};

export default BorrowBase;
