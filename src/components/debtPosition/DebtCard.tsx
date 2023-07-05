import React, { FC, useState } from "react";
import styles from "@/styles/Home.module.css";
import usdt from "@/assets/logo/nitroLogo.svg";
import eth from "@/assets/Eth logo.svg";
import Image from "next/image";
import { useDebtCardState } from "@/hooks/stores/debtStore";
import { ethers } from "ethers";
import DebtTimer from "./DebtTimer";
import DebtProgressBar from "./DebtProgressBar";

type Props = {
  amountIn: string;
  amountOut: string;
  borrowId: string;
  tokenId: string;
  startTime: string;
  endTime: string;
};

const DebtCard: FC<Props> = ({
  amountIn,
  amountOut,
  borrowId,
  tokenId,
  endTime,
  startTime,
}) => {
  const { setIsFlipped }: any = useDebtCardState();

  return (
    <div className={styles.debtCardFront}>
      <div className="px-2 flex pt-4  justify-between ">
        <div className="flex px-5  items-center ">
          <Image
            src={eth}
            alt=""
            width="0"
            height="0"
            className="-mx-3 h-7 w-7"
          />
          <Image src={usdt} alt="" width="0" height="0" className="  h-7 w-7" />
          <p className=" font-bold">WETH/NIT</p>
        </div>
        <p className="text-sm">ID: {borrowId}</p>
      </div>
      <div className="border-[0.1px] border-b border-[#21242C] mt-4"></div>
      <div className="px-5 mt-5">
        <div className="bg-greenRbg h-32 w-full flex flex-col gap-3 text-[#B7BECD] border-greenBorderRbg border rounded-md px-3 text-sm">
          <div className="flex justify-between mt-5">
            <p>Debt ID </p>
            <p>{tokenId}</p>
          </div>
          <div className="flex justify-between ">
            <p>Collateral Asset</p>
            <p>{Number(ethers.utils.formatEther(amountIn))} WETH</p>
          </div>
          <div className="flex justify-between  ">
            <p>Borrowed Asset </p>
            <p>
              {" "}
              {Number(ethers.utils.formatEther(amountOut))}
              NIT
            </p>
          </div>
        </div>
      </div>
      <p className="w-full flex justify-center text-[12px] mt-3">Expiry Date</p>
      <div className="w-full px-3 mt-5">
        <div className="w-full bg-[#D7DEEA] h-2 rounded-md">
          <DebtProgressBar startTime={startTime} endTime={endTime} />
        </div>
      </div>
      <div className="border-[0.1px] border-b border-[#21242C] mt-3"></div>
      <div>
        <p className="w-full flex justify-center text-[12px] mt-3">
          CountDown{" "}
        </p>
        <div className="w-full flex justify-center  mt-2 text-[#ED1D1D]">
          <DebtTimer startTime={startTime} endTime={endTime} />{" "}
        </div>
      </div>
    </div>
  );
};

export default DebtCard;
