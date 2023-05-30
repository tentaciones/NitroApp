import {
  useAddLiquidityPreviewState,
  useCreatePositionPreviewState,
} from "@/hooks/stores/addLiquidityStore";
import React from "react";
import { IoClose } from "react-icons/io5";
import eth from "@/assets/Eth logo.svg";
import usdt from "@/assets/tether-seeklogo.com 2.svg";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useSuccessState } from "@/hooks/stores/successStore";
type Props = {};

const AddLiquidityModal = (props: Props) => {
  const { isPreviewPositionAdd, setIsPreviewPositionAdd }: any =
    useAddLiquidityPreviewState();
  const { isSuccessfull, setIsSuccessfull }: any = useSuccessState();

  return (
    <>
      <div className="h-[160%] w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  flex items-center justify-center text-white ">
        <div className="h-[600px] w-[500px] bg-[#031120] px-10 rounded-2xl ">
          <div className="flex justify-between  mt-5  items-center">
            {" "}
            <div></div>{" "}
            <div>
              <p className="text-xl">Add Liquidity</p>
            </div>
            <IoClose
              className="text-2xl hover:cursor-pointer"
              onClick={() => setIsPreviewPositionAdd(false)}
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

          <div className="bg-[#091E33] h-32 w-full mt-5 rounded-2xl px-5 flex flex-col gap-5 justify-center items-center">
            <div className="flex justify-between  w-full ">
              <div className="flex gap-2 ">
                <Image
                  src={eth}
                  alt=""
                  width="0"
                  height="0"
                  className=" h-7 w-7"
                />
                <p>ETH</p>
              </div>
              <p>0.898</p>
            </div>
            <div className="flex justify-between  w-full ">
              <div className="flex gap-2 ">
                <Image
                  src={usdt}
                  alt=""
                  width="0"
                  height="0"
                  className=" h-7 w-7"
                />
                <p>USDT</p>
              </div>
              <p>898</p>
            </div>
          </div>
          <p className="mt-5">Selected Range</p>
          <div className="w-full flex mt-3 gap-5">
            <div className="w-1/2 border-[0.1px] rounded-xl h-20 border-[#8690A2] flex justify-between items-center  flex-col py-2">
              <p className="font-thin text-[#9DA5B4] text-sm ">Max Price</p>
              <p>{"<0.00002"}</p>
              <p className="font-thin text-[#9DA5B4] text-sm ">USDT Per ETH</p>
            </div>
            <div className="w-1/2 border-[0.1px] rounded-xl h-20 border-[#8690A2] flex justify-between items-center  flex-col py-2">
              <p className="font-thin text-[#9DA5B4] text-sm ">Max Price</p>
              <p>{"<0.00002"}</p>
              <p className="font-thin text-[#9DA5B4] text-sm ">USDT Per ETH</p>
            </div>
          </div>
          <div className="w-full border-[0.1px] mt-3 rounded-xl h-20 border-[#8690A2] flex justify-between items-center  flex-col py-2">
            <p className="font-thin text-[#9DA5B4] text-sm ">Current Price</p>
            <p>{"<0.00002"}</p>
            <p className="font-thin text-[#9DA5B4] text-sm ">USDT Per ETH</p>
          </div>
          <button
            className={`${styles.button} w-full mt-5`}
            onClick={() => {
              setIsPreviewPositionAdd(false);
              setIsSuccessfull(true);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddLiquidityModal;
