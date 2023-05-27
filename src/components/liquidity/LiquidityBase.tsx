import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import LiquidityTable from "./LiquidityTable";
import AddLiquidity from "./AddLiquidity";
import { useCreatePositionState } from "@/hooks/stores/createNewPositionState";
type Props = {};

const LiquidityBase = (props: Props) => {
  const { isCreateMewPosition, setIsCreateNewPosition }: any =
    useCreatePositionState();
  return (
    <div className="mt-[150px] text-white px-[150px] w-full">
      {isCreateMewPosition ? (
        <AddLiquidity />
      ) : (
        <>
          <div className="flex justify-between   ">
            <p className="text-2xl font-bold">Liquidity Positions</p>
            <button
              className={`${styles.button} w-[200px]`}
              onClick={() => setIsCreateNewPosition(true)}
            >
              + Create New Position
            </button>
          </div>
          <LiquidityTable />
        </>
      )}
    </div>
  );
};

export default LiquidityBase;
