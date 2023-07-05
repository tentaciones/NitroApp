import React from "react";
import eth from "@/assets/Eth logo.svg";
import nitro from "@/assets/logo/nitroLogo.svg";
import { useRouter } from "next/router";
import Image from "next/image";
import { demoPoolData } from "@/constants/pooldata";
type Props = {};

const AllPoolMobile = (props: Props) => {
  const router = useRouter();
  return (
    <div className="w-full h-[600px] md:hidden overflow-y-scroll pt-10">
      {demoPoolData.map(({ TokenX }) => {
        return (
          <div
            className="h-[150px]  w-full rounded-xl border-[0.1px] border-greyishBlue bg-[#061727] mb-5"
            key={TokenX}
            onClick={() => router.push("/liquidity")}
          >
            <div className="flex gap-5 mt-7">
              <div className="flex px-10 items-center ">
                <Image
                  src={eth}
                  alt=""
                  width="0"
                  height="0"
                  className="-mx-1 h-7 w-7"
                />
                <Image
                  src={nitro}
                  alt=""
                  width="0"
                  height="0"
                  className="  h-7 w-7"
                />
                <p className="px-2">WETH/NIT</p>
              </div>
              <div className="flex gap-2 items-center justify-center ">
                <p className="text-[#B7BECD] font-bold">TVL:</p>
                <div className="animate-pulse h-2 bg-[#031120] w-10"></div>
              </div>
            </div>
            <div className="flex justify-between text-[10px] mt-10 px-5">
              <div className="flex flex-col gap-2">
                <p className="text-[#B7BECD]">Reserve X</p>
                <div className="animate-pulse h-2 bg-[#031120] w-10"></div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#B7BECD]">Reserve Y</p>
                <div className="animate-pulse h-2 bg-[#031120] w-10"></div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#B7BECD]">Trading Volume</p>
                <div className="animate-pulse h-2 bg-[#031120] w-10"></div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#B7BECD]">Debt Ratio </p>
                <div className="animate-pulse h-2 bg-[#031120] w-10"></div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#B7BECD]">NIP Generated </p>
                <div className="animate-pulse h-2 bg-[#031120] w-10"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllPoolMobile;
