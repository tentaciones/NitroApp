import Image from "next/image";
import React, { useState } from "react";
import eth from "@/assets/Eth logo.svg";
import { CiSearch } from "react-icons/ci";
import { tokenData } from "@/constants/pooldata";
import {
  useSelectedTokenstate,
  useTokenstate,
} from "@/hooks/stores/tokenStore";
import { IoClose } from "react-icons/io5";
type Props = {};

const TokenListDropDown = (props: Props) => {
  const {
    selectedTokenX,
    setSelectedTokenX,
    selectedTokenY,
    setSelectedTokenY,
  }: any = useSelectedTokenstate();
  const { showTokenX, setShowTokenX, showTokenY, setShowTokenY }: any =
    useTokenstate();
  return (
    <div className=" h-[300px] absolute w-full mt-5  border-[0.1px] border-[#383D48]   rounded-2xl flex flex-col bg-[#071E33] hover:bg-[#0B2B47]  items-start px-5 hover:cursor-pointer overflow-y-scroll">
      <div className="flex w-full justify-between items-center mt-5 ">
        {" "}
        <p>select a token </p>
        <IoClose
          className="hover:cursor-pointer"
          onClick={() => {
            if (showTokenY) {
              setShowTokenY(false);
            } else if (showTokenX) {
              setShowTokenX(false);
            }
          }}
        />
      </div>

      <p></p>
      <div className="w-full  flex items-center mt-5 ">
        <input
          type="text"
          className="w-full h-[40px] rounded-2xl outline-none bg-background border border-[#E7E7E7] hover:border-[#00FDEE] focus:border-[#00FDEE]  px-8 placeholder:text-[#828282] placeholder:font-[200]"
          placeholder="search "
        />
        <CiSearch className="absolute mx-3 " />
      </div>
      {tokenData.map(({ image, name, address }) => {
        return (
          <div
            key={name}
            className="flex gap-2 mt-5 hover:cursor-pointer w-full "
            onClick={() => {
              if (showTokenX) {
                setSelectedTokenX({
                  name,
                  image,
                  address,
                });

                setShowTokenX(false);
              } else if (showTokenY) {
                setSelectedTokenY({
                  name,
                  image,
                  address,
                });

                setShowTokenY(false);
              }
            }}
          >
            {" "}
            <Image
              src={image}
              alt=""
              height={0}
              width={0}
              className="h-6 w-6"
            />
            <p>{name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TokenListDropDown;
