import React from "react";
import styles from "@/styles/Home.module.css";
import LiquidityTable from "./LiquidityTable";
type Props = {};

const LiquidityBase = (props: Props) => {
  return (
    <div className="mt-[150px] text-white px-[150px] w-full">
      {" "}
      <div className="flex justify-between   ">
        <p className="text-2xl font-bold">Liquidity Positions</p>
        <button className={styles.button}>+ Create New Position</button>
      </div>
      <LiquidityTable />
    </div>
  );
};

export default LiquidityBase;
