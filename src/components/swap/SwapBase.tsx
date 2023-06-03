import Image from "next/image";
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";
import eth from "@/assets/Eth logo.svg";
import usdt from "@/assets/tether-seeklogo.com 2.svg";
import { FiArrowLeft } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import {
  usePreviewSwapState,
  useSettingsState,
} from "@/hooks/stores/swapStore";
import SwapSetting from "./SwapSetting";
import ReviewSwapModal from "./ReviewSwapModal";
import { SuccessCard } from "../success";
import { useSuccessState } from "@/hooks/stores/successStore";

import { useRouter } from "next/router";
type Props = {};

const SwapBase = (props: Props) => {
  const { isSettingOpen, setIsSettingOpen }: any = useSettingsState();
  const { isPreviewSwap, setIsPreviewSwap }: any = usePreviewSwapState();
  const { isSuccessfull }: any = useSuccessState();
  const router = useRouter();
  return (
    <div className=" w-full  h-full mt-[180px] flex justify-center items-center text-white md:px-0 px-1">
      <div className="bg-[#061727]  h-[500px] w-[500px] rounded-2xl relative">
        <div className="flex justify-between px-5 items-center pt-5">
          <div></div>
          <p className="font-bold text-xl">Swap</p>
          <AiOutlineSetting
            className="text-2xl hover:cursor-pointer"
            onClick={() => setIsSettingOpen(!isSettingOpen)}
          />
        </div>
        <div className="border-b border-[0.1px] border-[#21242C] mt-3"></div>
        <div className="px-5">
          <div className="h-[120px] flex-col rounded-2xl w-full bg-[#071E33] mt-5 hover:border-[#383D48] hover:border px-5 flex justify-center">
            <div className="w-full flex">
              <input
                type="number"
                className="w-[70%] bg-[#071E33] outline-none px-5 text-xl placeholder:text-[#6A84A0]"
                placeholder="0.0 "
              />
              <div className="flex w-[30%] gap-1 hover:cursor-pointer bg-greenRbg border border-greenBorderRbg h-[40px] items-center justify-center rounded-3xl px-1">
                <Image src={eth} alt="" height={0} width={0} />
                <p className="text-sm">ETH</p>
              </div>
            </div>

            <div className="flex justify-between mt-2 text-sm font-thin">
              <p className="px-5">Balance: 0.089</p>
              <button className="text-[#212FE6] bg-[#8A93FF] px-2 font-bold rounded-xl">
                Max
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-3xl mt-3 text-[#00FDEE]">
          <FaLongArrowAltUp />
          <FaLongArrowAltDown className="-ml-3" />
        </div>
        <div className="px-5">
          <div className="h-[120px] flex-col rounded-2xl w-full bg-[#071E33] mt-5 hover:border-[#383D48] hover:border px-5 flex justify-center">
            <div className="w-full flex">
              <input
                type="number"
                className="w-[70%] bg-[#071E33] outline-none px-5 text-xl placeholder:text-[#6A84A0]"
                placeholder="0.0 "
              />
              <div className="flex w-[30%] gap-1 hover:cursor-pointer bg-greenRbg border border-greenBorderRbg h-[40px] items-center justify-center rounded-3xl px-1">
                <Image src={usdt} alt="" height={0} width={0} />
                <p className="text-sm">ETH</p>
              </div>
            </div>

            <div className="flex justify-between mt-2 text-sm font-thin">
              <p className="px-5">Balance: 0.089</p>
              <button className="text-[#212FE6] bg-[#8A93FF] px-2 font-bold rounded-xl">
                Max
              </button>
            </div>
          </div>
        </div>
        <div className="px-5">
          <button
            className={`${styles.button} w-full mt-4`}
            onClick={() => {
              setIsPreviewSwap(true);
            }}
          >
            Swap
          </button>
        </div>
        {isSettingOpen && (
          <div className="flex justify-end px-5 w-full">
            <SwapSetting />
          </div>
        )}
      </div>
      {isPreviewSwap && (
        <div className="absolute top-0 w-full h-screen">
          <ReviewSwapModal />
        </div>
      )}
      {isSuccessfull && !isPreviewSwap && (
        <div className="absolute top-0 w-full h-screen">
          <SuccessCard text="Swapped 0.003 EtH/USDt" arbiscanLink="" />
        </div>
      )}
    </div>
  );
};

export default SwapBase;
