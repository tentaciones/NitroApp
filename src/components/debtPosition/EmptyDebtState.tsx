import React from "react";

type Props = {};

const EmptyDebtState = (props: Props) => {
  return (
    <div className=" flex-col  mt-5 w-[60%] md:flex hidden h-screen pr-10 ">
      <div className="bg-[#061727] rounded-md h-96 w-full animate-pulse mt-32 justify-center items-center flex px-5">
        <p className="text-gray-500">No Debt added</p>
      </div>
    </div>
  );
};

export default EmptyDebtState;
