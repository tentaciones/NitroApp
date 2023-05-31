import Link from "next/link";
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
        <div className="md:h-20 h-[180px] flex gap-2 flex-col w-[200px] bg-[#061727] rounded-md absolute mt-8 px-5 justify-center -mx-[60px]">
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
          <Link
            href="/borrow"
            className="flex gap-2 items-center hover:cursor-pointer"
          >
            <p>Borrow</p>
            <FiArrowUpRight />
          </Link>

          <Link
            href="/debt"
            className="flex gap-2 items-center hover:cursor-pointer"
          >
            <p>Debt Position</p>
            <FiArrowUpRight />
          </Link>
        </div>
      )}{" "}
    </>
  );
};

export default Dropdown;
