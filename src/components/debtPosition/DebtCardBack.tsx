import React, { FC } from "react";
import styles from "@/styles/Home.module.css";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDebtCardState } from "@/hooks/stores/debtStore";
import { useRepayState, useRepayButtonText } from "@/hooks/stores/repayStore";
type Props = {
  handleBlacklist: () => void;
  handleRepayBlackListed: () => void;
  handleRepay: () => void;
  handleRollover: () => void;
};

const DebtCardBack: FC<Props> = ({
  handleBlacklist,
  handleRepayBlackListed,
  handleRollover,
  handleRepay,
}) => {
  const { isRepay, setIsRepay }: any = useRepayState();
  const { repayButtonText, setRepayButtonText }: any = useRepayButtonText();
  return (
    <div className={styles.debtCardBack}>
      <div className="px-2 flex pt-4 justify-end">
        <div className="flex gap-2 items-center">
          <p>Active</p>
          <div className="rounded-full h-2 w-2 bg-[#2BCD3E] animate-pulse"></div>
        </div>
      </div>
      <div className="border-[0.1px] border-b border-[#21242C] mt-4"></div>
      <div className="px-5 mt-5">
        <div className="bg-greenRbg h-[180px] w-full flex flex-col gap-2 text-white border-greenBorderRbg border rounded-md px-3 text-sm justify-center">
          <button className={styles.button} onClick={() => handleRollover()}>
            Debt Rollover
          </button>

          <button className={styles.button} onClick={() => handleBlacklist()}>
            Black List{" "}
          </button>
          <div
            className="flex justify-end items-center"
            onClick={() => {
              handleRepayBlackListed();
              console.log("re bla");
              //setIsRepay(true);
              //setRepayButtonText("Repay BlackList");
            }}
          >
            <p className="text-[#B7BECD]">Repay BlackList</p>
            <AiOutlineArrowRight />
          </div>
        </div>
      </div>
      <div className="border-[0.1px] border-b border-[#21242C] mt-6"></div>
      <div
        className="flex items-center px-2 mt-5"
        onClick={() => {
          handleRepay();

          //setIsRepay(true);
          //setRepayButtonText("Repay");
        }}
      >
        <p className="underline text-[#B7BECD]">Repay</p>
        <AiOutlineArrowRight />
      </div>
    </div>
  );
};

export default DebtCardBack;
