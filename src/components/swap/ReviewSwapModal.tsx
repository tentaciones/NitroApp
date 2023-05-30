import { usePreviewSwapState } from "@/hooks/stores/swapStore";
import React from "react";
import { IoClose } from "react-icons/io5";
import eth from "@/assets/Eth logo.svg";
import usdt from "@/assets/tether-seeklogo.com 2.svg";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useSuccessState } from "@/hooks/stores/successStore";
type Props = {};

const ReviewSwapModal = (props: Props) => {
  const { setIsPreviewSwap }: any = usePreviewSwapState();
  const { setIsSuccessfull }: any = useSuccessState();
  return (
    <>
      <div className=" h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  flex items-center justify-center text-white ">
        <div className="h-[600px] w-[500px] bg-[#031120]  rounded-2xl ">
          <div className="flex justify-between  mt-5  items-center px-10">
            {" "}
            <div></div>{" "}
            <div>
              <p className="text-xl">Review Swap</p>
            </div>
            <IoClose
              className="text-2xl hover:cursor-pointer"
              onClick={() => setIsPreviewSwap(false)}
            />
          </div>
          <div className="px-10">
            <p className="text-[#9DA5B4] mt-5">You Pay</p>
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold">0.00167 ETH</p>
              <Image
                src={eth}
                alt=""
                height={0}
                width={0}
                className="h-10 w-10"
              />
            </div>
            <p className="text-[#9DA5B4] mt-2">$30.00</p>
          </div>
          <div className="px-10">
            <p className="text-[#9DA5B4] mt-10">You Pay</p>
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold">0.00167 USDT</p>
              <Image
                src={usdt}
                alt=""
                height={0}
                width={0}
                className="h-10 w-10"
              />
            </div>
            <p className="text-[#9DA5B4] mt-2">$30.00</p>
          </div>
          <div className="border-b border-[0.1px] border-[#21242C] mt-5"></div>
          <div className="flex flex-col px-10 text-sm text-[#D7DEEA] gap-3 mt-10">
            <div className="flex justify-between">
              <p>Exchange Rate</p>
              <p>1 ETH = 0.00032 USDT</p>
            </div>
            <div className="flex justify-between">
              <p>Network Fee</p>
              <p>$2.34</p>
            </div>
            <div className="flex justify-between">
              <p>Price Impact</p>
              <p>0.078%</p>
            </div>
            <div className="flex justify-between">
              <p>Minimum Received</p>
              <p>29.8967 USDT</p>
            </div>
          </div>
          <div className="px-5">
            <button
              className={`${styles.button} w-full mt-4`}
              onClick={() => {
                setIsPreviewSwap(false);
                setIsSuccessfull(true);
              }}
            >
              Swap
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewSwapModal;
