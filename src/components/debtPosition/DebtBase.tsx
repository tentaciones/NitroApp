import React, { useState } from "react";
import DebtCard from "./DebtCard";
import DebtCardBack from "./DebtCardBack";
import styles from "@/styles/Home.module.css";
import { useDebtCardState } from "@/hooks/stores/debtStore";
import RepayModal from "../repay/RepayModal";
import { useRepayState } from "@/hooks/stores/repayStore";
import { SuccessCard } from "../success";
import { useSuccessState } from "@/hooks/stores/successStore";
type Props = {};

const DebtBase = (props: Props) => {
  const [isAll, setIsAll] = useState(false);
  const { isFlipped, setIsFlipped }: any = useDebtCardState();
  const { isRepay, setIsRepay }: any = useRepayState();
  const { isSuccessfull }: any = useSuccessState();
  return (
    <>
      <div className=" w-full  h-full mt-[180px]   text-white px-20">
        <div className="flex justify-between w-full">
          <p className="text-2xl">Debt Positions</p>
          <div className="flex text-sm bg-greenRbg p-[2px] rounded-md">
            <div
              className={`w-[60px] text-center h-[40px] flex items-center justify-center  text-[#B7BECD] rounded-l-[3px] bg-[#031120] hover:cursor-pointer ${
                isAll && "bg-greenRbg"
              }`}
              onClick={() => setIsAll(true)}
            >
              <p className={`${isAll && "text-[#00FDEE]"}`}>All</p>
            </div>
            <div
              className={`w-[150px]  text-center h-[40px] flex items-center justify-center  text-[#B7BECD]   rounded-r-[3px] bg-[#031120] hover:cursor-pointer ${
                !isAll && " bg-greenRbg"
              }`}
              onClick={() => setIsAll(false)}
            >
              <p className={`${!isAll && "text-[#00FDEE]"}`}>
                My Debt Positions
              </p>
            </div>
          </div>
        </div>
        <div className={styles.debtCardMainContainer}>
          <div className={styles.theCard}>
            <DebtCard />
            <DebtCardBack />
          </div>
        </div>
      </div>
      {isRepay && (
        <div className="absolute top-0 w-full h-screen">
          {" "}
          <RepayModal />
        </div>
      )}
      {isSuccessfull && (
        <div className="absolute top-0 w-full h-screen">
          <SuccessCard text="Repayed 0.023 USDT" arbiscanLink="" />
        </div>
      )}
    </>
  );
};

export default DebtBase;
