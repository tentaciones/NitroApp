import Image from "next/image";
import React from "react";
import eth from "@/assets/Eth logo.svg";
import usdt from "@/assets/tether-seeklogo.com 2.svg";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
type Props = {};

const SelectPair = (props: Props) => {
  return (
    <div className="w-1/2">
      <p>Select Pair</p>
      <div className="flex justify-between gap-5 w-full mt-5">
        <div className="h-[60px] rounded-2xl flex bg-[#071E33] hover:bg-[#0B2B47] w-1/2 items-center justify-between px-5 hover:cursor-pointer">
          <div className="flex gap-2">
            <Image src={eth} alt="" height={0} width={0} />
            <p>ETH</p>
          </div>
          <MdOutlineKeyboardArrowDown />
        </div>
        <div className="h-[60px] rounded-2xl flex bg-[#071E33] hover:bg-[#0B2B47] w-1/2 items-center justify-between px-5 hover:cursor-pointer">
          <div className="flex gap-2">
            <Image src={usdt} alt="" height={0} width={0} />
            <p>USDT</p>
          </div>
          <MdOutlineKeyboardArrowDown />
        </div>
      </div>

      <div className="h-[120px] flex-col rounded-2xl w-full bg-[#071E33] mt-5 hover:border-[#383D48] hover:border px-5 flex justify-center">
        <div className="w-full flex">
          <input
            type="number"
            className="w-4/5 bg-[#071E33] outline-none px-5 text-xl placeholder:text-[#6A84A0]"
            placeholder="0.0 "
          />
          <div className="flex w-1/5 gap-1 hover:cursor-pointer bg-greenRbg border border-greenBorderRbg h-[40px] items-center justify-center rounded-3xl px-1">
            <Image src={eth} alt="" height={0} width={0} />
            <p className="text-sm">ETH</p>
          </div>
        </div>

        <div className="flex justify-between mt-2 text-sm font-thin">
          <p className="px-5">Balance: 0.089</p>
          <button className="text-[#212FE6] bg-[#8A93FF] px-2 font-bold rounded-xl">
            Max
          </button>
        </div>
      </div>
      <div className="h-[120px] flex-col rounded-2xl w-full bg-[#071E33] mt-5 hover:border-[#383D48] hover:border px-5 flex justify-center">
        <div className="w-full flex">
          <input
            type="number"
            className="w-4/5 bg-[#071E33] outline-none px-5 text-xl placeholder:text-[#6A84A0]"
            placeholder="0.0 "
          />
          <div className="flex w-1/5 gap-1 bg-greenRbg border border-greenBorderRbg h-[40px] items-center justify-center rounded-3xl px-1 hover:cursor-pointer">
            <Image src={usdt} alt="" height={0} width={0} />
            <p className="text-sm">USDT</p>
          </div>
        </div>

        <div className="flex justify-between mt-2 text-sm font-thin">
          <p className="px-5">Balance: 0.089</p>
          <button className="text-[#212FE6] bg-[#8A93FF] px-2 font-bold rounded-xl">
            Max
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectPair;