import React, { FC, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
type Props = {
  isDropDown: Boolean;
};

const Dropdown: FC<Props> = ({ isDropDown }) => {
  return (
    <>
      {" "}
      {isDropDown && (
        <div className="md:h-20 h-[200px] w-[200px] bg-[#061727] mt-32 absolute flex flex-col gap-3 justify-center items-center md:items-start px-5 rounded-md">
          <div className="flex gap-2 items-center hover:cursor-pointer md:hidden">
            <p>Trade</p>
            <FiArrowUpRight />
          </div>
          <div className="flex gap-2 items-center hover:cursor-pointer md:hidden">
            <p>Pool</p>
            <FiArrowUpRight />
          </div>
          <div className="flex gap-2 items-center hover:cursor-pointer md:hidden">
            <p>Liquidity</p>
            <FiArrowUpRight />
          </div>
          <div className="flex gap-2 items-center hover:cursor-pointer">
            <p>Borrow</p>
            <FiArrowUpRight />
          </div>

          <div className="flex gap-2 items-center hover:cursor-pointer">
            <p>Debt Position</p>
            <FiArrowUpRight />
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default Dropdown;
