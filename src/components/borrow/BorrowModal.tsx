import {
  useAddLiquidityInputState,
  useCreatePositionPreviewState,
} from "@/hooks/stores/addLiquidityStore";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useSuccessState } from "@/hooks/stores/successStore";

import {
  useBorrowRangeState,
  useBorrowSideState,
  useBorrowState,
  useBorrowTxnState,
  useTokenPriceState,
} from "@/hooks/stores/borrowstores";
import { ethers } from "ethers";
import nitroAbi from "@/constants/abis/NitroRouter.json";
import nitroDebtAbi from "@/constants/abis/NitroDebtManager.json";
import {
  NITRO_DEBT_MANAGER,
  NITRO_PAIR,
  NITRO_ROUTER,
} from "@/constants/addresses";
import {
  TAddLiquidityInputState,
  TBorrowSideState,
  TBorrowTxnState,
  TRangeState,
  TTokenPriceState,
} from "../helper/types";
import { useSelectedTokenstate } from "@/hooks/stores/tokenStore";
import { PAIR_BIN_STEP } from "@/constants/constants";
import {
  generateDeltaIds,
  getBorrowRange,
  getIdFromPrice,
} from "../helper/price";
import { getAllMintedId } from "../helper/graphQueries";

const BorrowModal = () => {
  const { setIsPreview }: any = useBorrowState();
  const { setIsSuccessfull }: any = useSuccessState();
  const { isBelowPriceRange, setIsBelowPriceRange } =
    useBorrowSideState() as TBorrowSideState;
  const { tokenXAmount, tokenYAmount } =
    useAddLiquidityInputState() as TAddLiquidityInputState;
  const {
    selectedTokenX,

    selectedTokenY,
  }: any = useSelectedTokenstate();

  const { setBorrowTxnHash } = useBorrowTxnState() as TBorrowTxnState;

  const {
    lowerRangeInput,

    higherRangeInput,
  } = useBorrowRangeState() as TRangeState;
  const { price } = useTokenPriceState() as TTokenPriceState;
  const borrowHandler = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const signer = provider.getSigner();
      const routerContract = new ethers.Contract(
        NITRO_ROUTER,
        nitroAbi,
        signer
      );

      const minId = getIdFromPrice(lowerRangeInput, PAIR_BIN_STEP);
      const maxId = getIdFromPrice(higherRangeInput, PAIR_BIN_STEP);
      console.log(minId, maxId);

      const amount = ethers.utils.parseUnits(tokenXAmount);

      const { data } = await getAllMintedId();
      const maxContractObj = data.reduce((prev: any, current: any) => {
        const prevContractId = parseInt(prev.Contract_id);
        const currentContractId = parseInt(current.Contract_id);
        return currentContractId > prevContractId ? current : prev;
      });

      let id = maxContractObj ? Number(maxContractObj.Contract_id) + 1 : 0;

      await routerContract.MintDebtId(signer.getAddress());
      console.log(id, "klk");

      const borrowRange = getBorrowRange(minId, maxId);
      console.log("borrowRange", borrowRange);
      console.log(selectedTokenX.address, "selectedTokenX.address");

      const borrowTxn = await routerContract.Borrow([
        !isBelowPriceRange,
        signer.getAddress(),
        selectedTokenX.address,
        selectedTokenY.address,
        PAIR_BIN_STEP,
        amount,
        0,
        id.toString(),
        borrowRange,
      ]);
      console.log(borrowTxn);
      setBorrowTxnHash(borrowTxn.hash);
      setIsPreview(false);
      setIsSuccessfull(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen  px-2 w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  flex items-center justify-center text-white ">
        <div className="h-[600px] w-[500px] bg-[#031120] px-10 rounded-2xl ">
          <div className="flex justify-between  mt-5  items-center">
            {" "}
            <div></div>{" "}
            <div>
              <p className="text-xl">Borrow</p>
            </div>
            <IoClose
              className="text-2xl hover:cursor-pointer"
              onClick={() => setIsPreview(false)}
            />
          </div>
          <div className="flex  mt-10">
            <div className="flex px-5 items-center ">
              <Image
                src={selectedTokenX.image}
                alt=""
                width="0"
                height="0"
                className="-mx-3 h-7 w-7"
              />
              <Image
                src={selectedTokenY.image}
                alt=""
                width="0"
                height="0"
                className="  h-7 w-7"
              />
              <p className="px-2">
                {selectedTokenX.name}/{selectedTokenY.name}
              </p>
            </div>
          </div>

          <div className="bg-[#091E33] h-32 w-full mt-5 rounded-2xl px-5 flex flex-col gap-5 justify-center items-center">
            <div className="flex justify-between  w-full ">
              <div className="flex gap-2 ">
                <Image
                  src={selectedTokenX.image}
                  alt=""
                  width="0"
                  height="0"
                  className=" h-7 w-7"
                />
                <p>{selectedTokenX.name}</p>
              </div>
              <p>{tokenXAmount}</p>
            </div>
            <div className="flex justify-between  w-full ">
              <div className="flex gap-2 ">
                <Image
                  src={selectedTokenY.image}
                  alt=""
                  width="0"
                  height="0"
                  className=" h-7 w-7"
                />
                <p>{selectedTokenY.name}</p>
              </div>
              <p>{tokenYAmount}</p>
            </div>
          </div>
          <p className="mt-5">Selected Range</p>
          <div className="w-full flex mt-3 gap-5">
            <div className="w-1/2 border-[0.1px] rounded-xl h-20 border-[#8690A2] flex justify-between items-center  flex-col py-2">
              <p className="font-thin text-[#9DA5B4] text-sm ">Max Price</p>
              <p>{`<${Math.floor(lowerRangeInput * 100) / 100}`}</p>
              <p className="font-thin text-[#9DA5B4] text-sm ">USDT Per ETH</p>
            </div>
            <div className="w-1/2 border-[0.1px] rounded-xl h-20 border-[#8690A2] flex justify-between items-center  flex-col py-2">
              <p className="font-thin text-[#9DA5B4] text-sm ">Max Price</p>
              <p>{`<${Math.floor(higherRangeInput * 100) / 100}`}</p>
              <p className="font-thin text-[#9DA5B4] text-sm ">USDT Per ETH</p>
            </div>
          </div>
          <div className="w-full border-[0.1px] mt-3 rounded-xl h-20 border-[#8690A2] flex justify-between items-center  flex-col py-2">
            <p className="font-thin text-[#9DA5B4] text-sm ">Current Price</p>
            <p>{`<${Math.floor(price * 100) / 100}`}</p>
            <p className="font-thin text-[#9DA5B4] text-sm ">USDT Per ETH</p>
          </div>
          <button
            className={`${styles.button} w-full mt-5`}
            onClick={() => {
              borrowHandler();
            }}
          >
            Borrow
          </button>
        </div>
      </div>
    </>
  );
};

export default BorrowModal;
