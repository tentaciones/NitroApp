import React from "react";
import styles from "@/styles/Home.module.css";
import usdt from "@/assets/tether-seeklogo.com 2.svg";
import eth from "@/assets/Eth logo.svg";
import Image from "next/image";
import { useDebtCardState } from "@/hooks/stores/debtStore";
type Props = {};

const DebtCard = (props: Props) => {
  const { setIsFlipped }: any = useDebtCardState();
  return (
    <div className={styles.debtCardFront}>
      <div className="px-2 flex pt-4 justify-between ">
        <div className="flex px-5  items-center ">
          <Image
            src={eth}
            alt=""
            width="0"
            height="0"
            className="-mx-3 h-7 w-7"
          />
          <Image src={usdt} alt="" width="0" height="0" className="  h-7 w-7" />
          <p className=" font-bold">ETH/USDT</p>
        </div>
        <p className="text-sm">ID: 89109</p>
      </div>
      <div className="border-[0.1px] border-b border-[#21242C] mt-4"></div>
      <div className="px-5 mt-5">
        <div className="bg-greenRbg h-32 w-full flex flex-col gap-2 text-[#B7BECD] border-greenBorderRbg border rounded-md px-3 text-sm">
          <div className="flex justify-between mt-2">
            <p>Health Factor</p>
            <p>10%</p>
          </div>
          <div className="flex justify-between ">
            <p>DeBt ID </p>
            <p>80%</p>
          </div>
          <div className="flex justify-between ">
            <p>Collateral Asset</p>
            <p>10 ETH</p>
          </div>
          <div className="flex justify-between ">
            <p>Borrowed Asset </p>
            <p>10 USDT</p>
          </div>
        </div>
      </div>
      <p className="w-full flex justify-center text-[12px] mt-3">Expiry Date</p>
      <div className="w-full px-3 mt-5">
        <div className="w-full bg-[#D7DEEA] h-2 rounded-md">
          <div className="w-1/2 bg-[#12AFA6] h-2 rounded-md"></div>
        </div>
      </div>
      <div className="border-[0.1px] border-b border-[#21242C] mt-3"></div>
      <div>
        <p className="w-full flex justify-center text-[12px] mt-3">
          CountDown{" "}
        </p>
        <p className="w-full flex justify-center  mt-2 text-[#ED1D1D]">
          07:44{" "}
        </p>
      </div>
    </div>
  );
};

export default DebtCard;
