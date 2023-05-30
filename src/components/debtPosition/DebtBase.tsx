import React, { useState } from "react";
import DebtCard from "./DebtCard";
import DebtCardBack from "./DebtCardBack";
import styles from "@/styles/Home.module.css";
type Props = {};

const DebtBase = (props: Props) => {
  const [isAll, setIsAll] = useState(false);
  return (
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
            <p className={`${!isAll && "text-[#00FDEE]"}`}>My Debt Positions</p>
          </div>
        </div>
      </div>
      <div className="w-[320px]">
        <DebtCard />
      </div>
    </div>
  );
};

export default DebtBase;
