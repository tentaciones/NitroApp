import React from "react";
import emptyState from "@/assets/Empty state.svg";
import Image from "next/image";
type Props = {};

const MyPool = (props: Props) => {
  return (
    <div className="">
      <div className="flex  items-center mt-10 flex-col">
        <Image
          src={emptyState}
          alt=""
          height={0}
          width={0}
          className="w-64 h-64"
        />
        <p className="text-[#EDF0F7]">{"You don't have any position"}</p>
      </div>
    </div>
  );
};

export default MyPool;
