import React from "react";
import eth from "@/assets/Eth logo.svg";
import usdt from "@/assets/tether-seeklogo.com 2.svg";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import styles from "@/styles/Home.module.css";
import { useRepayButtonText, useRepayState } from "@/hooks/stores/repayStore";
import { useSuccessState } from "@/hooks/stores/successStore";
type Props = {};

const RepayModal = (props: Props) => {
  const { isRepay, setIsRepay }: any = useRepayState();
  const { repayButtonText }: any = useRepayButtonText();
  const { setIsSuccessfull }: any = useSuccessState();

  return (
    <>
      <div className=" h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  flex items-center justify-center text-white ">
        <div className="h-[500px] w-[500px] bg-[#031120]  rounded-2xl px-5">
          <div className="flex justify-between mt-5 text-xl">
            <div></div>
            <p className="">Repay</p>
            <IoClose
              className="text-2xl hover:cursor-pointer"
              onClick={() => {
                setIsRepay(false);
              }}
            />
          </div>
          <div className="flex  mt-10">
            <div className="flex px-5 items-center ">
              <Image
                src={eth}
                alt=""
                width="0"
                height="0"
                className="-mx-3 h-7 w-7"
              />
              <Image
                src={usdt}
                alt=""
                width="0"
                height="0"
                className="  h-7 w-7"
              />
              <p className="px-2">ETH/USDT</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between px-5 mt-10">
              <p className="text-[#B7BECD]">Debt Value</p>
              <p>230 USDT</p>
            </div>
            <div className="flex justify-between px-5">
              <p className="text-[#B7BECD]">Collateral Value </p>
              <p>230 USDT</p>
            </div>
            <div className="flex justify-between px-5">
              <p className="text-[#B7BECD]">Market Value</p>
              <p>230 USDT</p>
            </div>
          </div>
          <div className="px-5">
            <div className="h-[120px] flex-col rounded-2xl w-full bg-[#071E33] mt-5 hover:border-[#383D48] hover:border px-5 flex justify-center">
              <div className="w-full flex">
                <input
                  type="number"
                  className="w-[75%] bg-[#071E33] outline-none px-5 text-xl placeholder:text-[#6A84A0]"
                  placeholder="0.0 "
                />
                <div className="flex w-[25%] gap-1 hover:cursor-pointer bg-greenRbg border border-greenBorderRbg h-[40px] items-center justify-center rounded-3xl px-1">
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
          <div className="px-5">
            <button
              className={`${styles.button} w-full mt-5`}
              onClick={() => {
                setIsRepay(false);
                setIsSuccessfull(true);
              }}
            >
              {repayButtonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepayModal;
