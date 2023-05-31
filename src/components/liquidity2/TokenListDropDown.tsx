import Image from "next/image";
import React, { useState } from "react";
import eth from "@/assets/Eth logo.svg";
import { CiSearch } from "react-icons/ci";
import { tokenData } from "@/constants/pooldata";
import {
  useSelectedTokenstate,
  useTokenstate,
} from "@/hooks/stores/tokenStore";
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
    <div className="h-[300px] rounded-2xl flex flex-col bg-[#071E33] hover:bg-[#0B2B47] w-1/2 items-start px-5 hover:cursor-pointer overflow-y-scroll">
      <div className="w-full  flex items-center mt-5 ">
        <input
          type="text"
          className="w-full h-[30px] rounded-md outline-none bg-background border border-[#E7E7E7] hover:border-[#00FDEE] focus:border-[#00FDEE]  px-8 placeholder:text-[#828282] placeholder:font-[200]"
          placeholder="search "
        />
        <CiSearch className="absolute mx-3 " />
      </div>

      {tokenData.map(({ image, name }) => {
        return (
          <div
            key={name}
            className="flex gap-2 mt-5 hover:cursor-pointer w-full "
            onClick={() => {
              if (showTokenX) {
                setSelectedTokenX({
                  name,
                  image,
                });
                setShowTokenX(false);
              } else if (showTokenY) {
                setSelectedTokenY({
                  name,
                  image,
                });
                setShowTokenY(false);
              }
            }}
          >
            {" "}
            <Image src={image} alt="" height={0} width={0} />
            <p>{name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TokenListDropDown;
