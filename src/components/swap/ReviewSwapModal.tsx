import {
  useCustomSlippageState,
  usePreviewParamsState,
  usePreviewSwapState,
  useSelectedSwapTokenstate,
  useSwapInputState,
  useSwapTxnHahState,
} from "@/hooks/stores/swapStore";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useSuccessState } from "@/hooks/stores/successStore";
import { NITRO_ROUTER } from "@/constants/addresses";
import {
  TCustomSlippageState,
  TPreviewParamsState,
  TSelectedSwapTokenstate,
  TTokenInputState,
  TSwapTxnHahState,
} from "../helper/types";
import { ethers } from "ethers";
import nitroRouterAbi from "@/constants/abis/NitroRouter.json";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AVERAGE_SLIPPAGE, PAIR_BIN_STEP } from "@/constants/constants";
type Props = {};

const ReviewSwapModal = (props: Props) => {
  const { customSlippage, setCustomSlippage } =
    useCustomSlippageState() as TCustomSlippageState;
  const { setIsPreviewSwap }: any = usePreviewSwapState();
  const { setIsSuccessfull }: any = useSuccessState();
  const { tokenX, tokenY, setTokenX, setTokenY } =
    useSwapInputState() as TTokenInputState;
  const { previewParams } = usePreviewParamsState() as TPreviewParamsState;
  const { txnHash, setTxnHash } = useSwapTxnHahState() as TSwapTxnHahState;
  const {
    selectedTokenX,

    selectedTokenY,
  } = useSelectedSwapTokenstate() as TSelectedSwapTokenstate;

  const handleSwap = async () => {
    let tempProvider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );
    let tempSigner = tempProvider.getSigner();

    let swapContract = new ethers.Contract(
      "0x5d8165adD2156bFD51E6CcCb15293db07Fe8ba07",
      nitroRouterAbi,
      tempSigner
    );

    try {
      const getSlippage = () => {
        if (customSlippage) {
          return 100 - Number(customSlippage);
        } else {
          return 100 - AVERAGE_SLIPPAGE;
        }
      };
      console.log("getSlippage()", getSlippage());
      const slippage = getSlippage();
      const amountOutWithSlippage = (Number(tokenY) * slippage) / 100;
      console.log("amountOutWithSlippage", Math.floor(amountOutWithSlippage));
      console.log(
        "estimatedTimestampmmmmm",
        Number(previewParams.estimatedTimestamp)
      );

      const txn = await swapContract.swapExactTokensForTokens(
        String(ethers.utils.parseUnits(tokenX)),
        Math.floor(amountOutWithSlippage),
        [PAIR_BIN_STEP],
        [selectedTokenX.address, selectedTokenY.address],
        tempSigner.getAddress(),
        Number(previewParams.estimatedTimestamp)
      );
      setTxnHash(txn.hash);
      console.log(txn);
      setIsPreviewSwap(false);
      setIsSuccessfull(true);
      setTokenX("");
      setTokenY("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log("previewParams.loaded", previewParams);

  return (
    <>
      <div className=" h-full w-full px-2 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  flex items-center justify-center text-white ">
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
              <p className="text-3xl font-bold">
                {tokenX} {selectedTokenX.name}
              </p>
              <Image
                src={selectedTokenX.image}
                alt=""
                height={0}
                width={0}
                className="h-10 w-10"
              />
            </div>
          </div>
          <div className="px-10">
            <p className="text-[#9DA5B4] mt-10">You Receive</p>
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold">
                {tokenY} {selectedTokenY.name}
              </p>
              <Image
                src={selectedTokenY.image}
                alt=""
                height={0}
                width={0}
                className="h-10 w-10"
              />
            </div>
          </div>
          <div className="border-b border-[0.1px] border-[#21242C] mt-5"></div>
          {previewParams.loaded ? (
            <div className="flex flex-col px-10 text-sm text-[#D7DEEA] gap-3 mt-10">
              <div className="flex justify-between">
                <p>Exchange Rate</p>
                <p>
                  1 {previewParams.tokenXName} = {previewParams.exchangeRate}{" "}
                  {previewParams.tokenYName}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Network Fee</p>
                <p>{previewParams.exchangeRate} ETH</p>
              </div>
              <div className="flex justify-between">
                <p>Price Impact</p>
                <p>0.078%</p>
              </div>
              <div className="flex justify-between">
                <p>Minimum Received</p>
                <p>
                  {previewParams.mininumReceived} {previewParams.tokenYName}{" "}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center ">
              <AiOutlineLoading3Quarters className="animate-spin text-5xl mt-10 mb-32" />
            </div>
          )}
          {previewParams.loaded && (
            <div className="px-5">
              <button
                className={`${styles.button} w-full mt-4`}
                type="button"
                onClick={() => {
                  handleSwap();
                }}
              >
                Swap
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewSwapModal;
