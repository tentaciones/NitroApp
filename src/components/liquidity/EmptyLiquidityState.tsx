import Image from "next/image";
import React from "react";
import emptyState from "@/assets/Empty state.svg";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
type Props = {};

const EmptyLiquidityState = (props: Props) => {
  const router = useRouter();
  return (
    <div className=" flex-col  mt-5 w-[60%] md:flex hidden h-screen pr-10 ">
      <div className="bg-[#061727]  rounded-md h-96 w-full animate-pulse mt-32 justify-center items-center flex-col flex px-5">
        <Image src={emptyState} alt="" height={0} width={0} />
        <p className="text-gray-500">No Liquidity added</p>
      </div>
    </div>
  );
};

export default EmptyLiquidityState;
